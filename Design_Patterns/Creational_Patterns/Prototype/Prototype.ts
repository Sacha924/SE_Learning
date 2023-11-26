interface IPrototype {
	getClone(): InstanceType<typeof Person>
}

class Person implements IPrototype {
	public name: string
	public age: number
	public hobby: string

	constructor(name: string, age: number, hobby: string) {
		this.name = name
		this.age = age
		this.hobby = hobby
	}

	public getClone(): InstanceType<typeof Person> {
		return new Person(this.name, this.age, this.hobby);
	}
}

const john: Person = new Person('john doe', 30, 'programming')
console.log(john)

const jane = john.getClone()
jane.name = 'jane doe'
jane.hobby = 'swimming'

console.log(jane)
console.log(john)

