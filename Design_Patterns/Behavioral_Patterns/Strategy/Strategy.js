/**
 * The Context defines the interface of interest to clients.
 */
var Contexttt = /** @class */ (function () {
    /**
     * Usually, the Context accepts a strategy through the constructor, but also
     * provides a setter to change it at runtime.
     */
    function Contexttt(strategy) {
        this.strategy = strategy;
    }
    /**
     * Usually, the Context allows replacing a Strategy object at runtime.
     */
    Contexttt.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;
    };
    /**
     * The Context delegates some work to the Strategy object instead of
     * implementing multiple versions of the algorithm on its own.
     */
    Contexttt.prototype.doSomeBusinessLogic = function () {
        // ...
        console.log('Context: Sorting data using the strategy (not sure how it\'ll do it)');
        var result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));
        // ...
    };
    return Contexttt;
}());
/**
 * Concrete Strategies implement the algorithm while following the base Strategy
 * interface. The interface makes them interchangeable in the Context.
 */
var ConcreteStrategyAAAA = /** @class */ (function () {
    function ConcreteStrategyAAAA() {
    }
    ConcreteStrategyAAAA.prototype.doAlgorithm = function (data) {
        return data.sort();
    };
    return ConcreteStrategyAAAA;
}());
var ConcreteStrategyB = /** @class */ (function () {
    function ConcreteStrategyB() {
    }
    ConcreteStrategyB.prototype.doAlgorithm = function (data) {
        return data.reverse();
    };
    return ConcreteStrategyB;
}());
/**
 * The client code picks a concrete strategy and passes it to the context. The
 * client should be aware of the differences between strategies in order to make
 * the right choice.
 */
var contexttt = new Contexttt(new ConcreteStrategyAAAA());
console.log('Client: Strategy is set to normal sorting.');
contexttt.doSomeBusinessLogic();
console.log('');
console.log('Client: Strategy is set to reverse sorting.');
contexttt.setStrategy(new ConcreteStrategyB());
contexttt.doSomeBusinessLogic();
