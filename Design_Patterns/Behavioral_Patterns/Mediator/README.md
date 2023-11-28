👽 Mediator
========

Mediator is a behavioral design pattern that lets you reduce chaotic dependencies between objects. The pattern restricts direct communications between the objects and forces them to collaborate only via a mediator object.



Real world example
> A general example would be when you talk to someone on your mobile phone, there is a network provider sitting between you and them and your conversation goes through it instead of being directly sent. In this case network provider is mediator.

In plain words
> Mediator pattern adds a third party object (called mediator) to control the interaction between two objects (called colleagues). It helps reduce the coupling between the classes communicating with each other. Because now they don't need to have the knowledge of each other's implementation.



## Applicability 

-  **Use the Mediator pattern when it’s hard to change some of the classes because they are tightly coupled to a bunch of other classes.**

- **Use the pattern when you can’t reuse a component in a different program because it’s too dependent on other components.**

- **Use the Mediator when you find yourself creating tons of component subclasses just to reuse some basic behavior in various contexts.**