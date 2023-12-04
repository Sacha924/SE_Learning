💢 State
-----
Real world example
> Imagine you are using some drawing application, you choose the paint brush to draw. Now the brush changes its behavior based on the selected color i.e. if you have chosen red color it will draw in red, if blue then it will be in blue etc.  

In plain words
> It lets you change the behavior of a class when the state changes.

Wikipedia says
> The state pattern is a behavioral software design pattern that implements a state machine in an object-oriented way. With the state pattern, a state machine is implemented by implementing each individual state as a derived class of the state pattern interface, and implementing state transitions by invoking methods defined by the pattern's superclass.
> The state pattern can be interpreted as a strategy pattern which is able to switch the current strategy through invocations of methods defined in the pattern's interface.


- **Use the pattern when you have a class polluted with massive conditionals that alter how the class behaves according to the current values of the class’s fields.**

- **Use the State pattern when you have an object that behaves differently depending on its current state, the number of states is enormous, and the state-specific code changes frequently.**

RQ implem :


- Both Code 1 and Code 2 are attempting to implement the State Design Pattern, but they do so in fundamentally different ways, reflecting varying degrees of adherence to the principles of the pattern.

- Code 1 Analysis: Classical State Design Pattern
Code 1 is a textbook implementation of the State Design Pattern. It involves the following elements:

- Context Class (Context): Maintains an instance of a concrete state subclass and delegates state-specific behavior to it.
State Interface (State): An abstract base class with a method set (handle1, handle2) that is overridden by concrete states.
Concrete State Classes (ConcreteStateA, ConcreteStateB): Implement specific behaviors associated with different states of the context. They can also initiate a state transition by calling transitionTo on the context.
This code exhibits the key characteristics of the State Pattern:

- Encapsulation of varying behavior for different states.
Easy addition of new states without modifying existing classes.
The context class is unaware of the specific state it's in, thus adhering to the Open/Closed Principle.
- Code 2 Analysis: Simplified State Representation
Code 2 simplifies the State Design Pattern, primarily by using a string variable (state) to represent different states:

- State Representation: The state is represented by a string field within the Document class.
- State Transition Logic: State transitions are handled using a switch statement inside the publish method. The transitions depend on the current state and certain conditions (like currentUser.role).
While this approach is simpler and may be suitable for scenarios with limited state behaviors and transitions, it has some drawbacks compared to the classical pattern:

- The state behavior logic is not encapsulated in separate classes, leading to less modularity.
- The Document class directly manages state transitions and behaviors, which can make it more complex and harder to maintain, especially as new states or behaviors are added.
- It violates the Open/Closed Principle, as adding a new state or modifying a state behavior requires changes to the existing Document class.
Conclusion
- Code 1 is a full implementation of the State Design Pattern with all its principles and benefits.
- Code 2 is a simplified version that uses a variable for state representation. While it loosely follows the State Pattern's concept, it does not fully leverage the pattern's benefits in terms of encapsulation, modularity, and maintainability.