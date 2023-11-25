# Adapter

> **Intent** Adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate.

##  Problem

Imagine that you’re creating a stock market monitoring app. The app downloads the stock data from multiple sources in XML format and then displays nice-looking charts and diagrams for the user.

At some point, you decide to improve the app by integrating a smart 3rd-party analytics library. But there’s a catch: the analytics library only works with data in JSON format.

<img src="1.JPG"/>


You could change the library to work with XML. However, this might break some existing code that relies on the library. And worse, you might not have access to the library’s source code in the first place, making this approach impossible.

## Solution

You can create an adapter. This is a special object that converts the interface of one object so that another object can understand it.

An adapter wraps one of the objects to hide the complexity of conversion happening behind the scenes. The wrapped object isn’t even aware of the adapter. 

Adapters can not only convert data into various formats but can also help objects with different interfaces collaborate. Here’s how it works:

The adapter gets an interface, compatible with one of the existing objects.
Using this interface, the existing object can safely call the adapter’s methods.
Upon receiving a call, the adapter passes the request to the second object, but in a format and order that the second object expects.

<img src="2.JPG"/>


## Applicability

 Use the Adapter class when you want to use some existing class, but its interface isn’t compatible with the rest of your code.

 The Adapter pattern lets you create a middle-layer class that serves as a translator between your code and a legacy class, a 3rd-party class or any other class with a weird interface.

 Use the pattern when you want to reuse several existing subclasses that lack some common functionality that can’t be added to the superclass.


 ## Need more details ?

 https://refactoring.guru/design-patterns/adapter
