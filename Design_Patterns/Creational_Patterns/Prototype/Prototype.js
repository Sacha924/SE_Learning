var Person = /** @class */ (function () {
    function Person(name, age, hobby) {
        this.name = name;
        this.age = age;
        this.hobby = hobby;
    }
    Person.prototype.getClone = function () {
        return this;
    };
    return Person;
}());
var john = new Person('john doe', 30, 'programming');
console.log(john);
var jane = john.getClone();
jane.name = 'jane doe';
jane.hobby = 'swimming';
console.log(jane);
