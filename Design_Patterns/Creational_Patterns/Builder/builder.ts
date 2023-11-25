class Burger {
    private size: number;
    private cheese: boolean;
    private pepperoni: boolean;
    private lettuce: boolean;
    private tomato: boolean;

    constructor(builder: BurgerBuilder) {
        this.size = builder.size;
        this.cheese = builder.cheese;
        this.pepperoni = builder.pepperoni;
        this.lettuce = builder.lettuce;
        this.tomato = builder.tomato;
    }
}

class BurgerBuilder {
    public size: number;
    public cheese: boolean = false;
    public pepperoni: boolean = false;
    public lettuce: boolean = false;
    public tomato: boolean = false;

    constructor(size: number) {
        this.size = size;
    }

    public addPepperoni(): BurgerBuilder {
        this.pepperoni = true;
        return this;
    }

    public addLettuce(): BurgerBuilder {
        this.lettuce = true;
        return this;
    }

    public addCheese(): BurgerBuilder {
        this.cheese = true;
        return this;
    }

    public addTomato(): BurgerBuilder {
        this.tomato = true;
        return this;
    }

    public build(): Burger {
        return new Burger(this);
    }
}

// Usage
const burger = new BurgerBuilder(14)
    .addPepperoni()
    .addLettuce()
    .addTomato()
    .build();
