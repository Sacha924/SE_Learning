abstract class Account {
    protected successor: Account | null = null;
    protected balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    public setNext(account: Account): void {
        this.successor = account;
    }

    public pay(amountToPay: number): void {
        if (this.canPay(amountToPay)) {
            console.log(`Paid ${amountToPay} using ${this.constructor.name}`);
        } else if (this.successor) {
            console.log(`Cannot pay using ${this.constructor.name}. Proceeding ..`);
            this.successor.pay(amountToPay);
        } else {
            throw new Error('None of the accounts have enough balance');
        }
    }

    protected canPay(amount: number): boolean {
        return this.balance >= amount;
    }
}

class Bank extends Account {}

class Paypal extends Account {}

class Bitcoin extends Account {}

// Setting up the chain
const bank = new Bank(100);       // Bank with balance 100
const paypal = new Paypal(200);   // Paypal with balance 200
const bitcoin = new Bitcoin(300); // Bitcoin with balance 300

bank.setNext(paypal);
paypal.setNext(bitcoin);

// Trying to pay using the first priority i.e., bank
try {
    bank.pay(259);
} catch (error) {
    console.error(error);
}

// Output will be
// ==============
// Cannot pay using Bank. Proceeding ..
// Cannot pay using Paypal. Proceeding ..
// Paid 259 using Bitcoin
