package main

import (
	"fmt"
	"sync"
	"time"
	"context"
)

const (
    Closed   = "closed"
    Open     = "open"
    HalfOpen = "half-open"
)

// circuitBreaker manages the state and behavior of the circuit breaker
type circuitBreaker struct {
    mu                   sync.Mutex // Guards the circuit breaker state
    state                string  // Current state of the circuit breaker
    failureCount         int     // Number of consecutive failures
    lastFailureTime      time.Time // Time of the last failure
    halfOpenSuccessCount int    // Successful requests in half-open state

    failureThreshold     int   // Failures to trigger open state
    recoveryTime         time.Duration // Wait time before half-open
    halfOpenMaxRequests  int   // Requests allowed in half-open state
    timeout              time.Duration // Timeout for requests
}

func NewCircuitBreaker(
    failureThreshold int,
    recoveryTime time.Duration,
    halfOpenMaxRequests int,
    timeout time.Duration,
) *circuitBreaker {
    return &circuitBreaker{
        state:               Closed,
        failureThreshold:    failureThreshold,
        recoveryTime:        recoveryTime,
        halfOpenMaxRequests: halfOpenMaxRequests,
        timeout:             timeout,
    }
}

func (cb *circuitBreaker) Call(fn func() (interface{}, error)) (interface{}, error) {
	cb.mu.Lock()
	defer cb.mu.Unlock()

    // log.Info("Making a request", "state", cb.state)
    switch cb.state {
    case Closed:
        return cb.handleClosedState(fn)
    case Open:
        return cb.handleOpenState()
    case HalfOpen:
        return cb.handleHalfOpenState(fn)
    default:
        return nil,fmt.Errorf("unknown circuit state")
    }
}

func (cb *circuitBreaker) handleClosedState(fn func() (interface{}, error)) (interface{}, error) {
	result, err := cb.runWithTimeout(fn)
	if err != nil {
		cb.failureCount++
		cb.lastFailureTime = time.Now()
		if cb.failureCount >= cb.failureThreshold {
            cb.state = Open
        }
        return nil, err
	}
    cb.failureCount = 0
	return result, err
}

func (cb *circuitBreaker) handleOpenState() (interface{}, error) {
	if time.Since(cb.lastFailureTime) > cb.recoveryTime {
		cb.state = HalfOpen
		cb.halfOpenSuccessCount = 0
        cb.failureCount = 0
		return nil, nil
	}
	return nil, fmt.Errorf("circuit in Open State, request blocked")
}

func (cb *circuitBreaker) handleHalfOpenState(fn func() (interface{}, error)) (interface{}, error) {
	result, err := cb.runWithTimeout(fn)
	if err != nil {
        cb.state = Open
        cb.lastFailureTime = time.Now()
        return nil, err
	}
	cb.halfOpenSuccessCount++
    if cb.halfOpenSuccessCount >= cb.halfOpenMaxRequests {
        cb.resetCircuit()
    }
	return result, err
}

func (cb *circuitBreaker) resetCircuit() {
    cb.failureCount = 0
    cb.state = Closed
}

func (cb *circuitBreaker) runWithTimeout(fn func() (interface{}, error)) (interface{}, error) {
    ctx, cancel := context.WithTimeout(context.Background(), cb.timeout)
    defer cancel()

    resultChan := make(chan struct {
        result interface{}
        err    error
    }, 1)

    go func() {
        result, err := fn()
        resultChan <- struct {
            result interface{}
            err    error
        }{result, err}
    }()

    select {
    case <-ctx.Done():
        return nil, fmt.Errorf("request timed out")
    case res := <-resultChan:
        return res.result, res.err
    }
}