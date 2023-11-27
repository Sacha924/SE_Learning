var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Account = /** @class */ (function () {
    function Account(balance) {
        this.successor = null;
        this.balance = balance;
    }
    Account.prototype.setNext = function (account) {
        this.successor = account;
    };
    Account.prototype.pay = function (amountToPay) {
        if (this.canPay(amountToPay)) {
            console.log("Paid ".concat(amountToPay, " using ").concat(this.constructor.name));
        }
        else if (this.successor) {
            console.log("Cannot pay using ".concat(this.constructor.name, ". Proceeding .."));
            this.successor.pay(amountToPay);
        }
        else {
            throw new Error('None of the accounts have enough balance');
        }
    };
    Account.prototype.canPay = function (amount) {
        return this.balance >= amount;
    };
    return Account;
}());
var Bank = /** @class */ (function (_super) {
    __extends(Bank, _super);
    function Bank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bank;
}(Account));
var Paypal = /** @class */ (function (_super) {
    __extends(Paypal, _super);
    function Paypal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Paypal;
}(Account));
var Bitcoin = /** @class */ (function (_super) {
    __extends(Bitcoin, _super);
    function Bitcoin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bitcoin;
}(Account));
// Setting up the chain
var bank = new Bank(100); // Bank with balance 100
var paypal = new Paypal(200); // Paypal with balance 200
var bitcoin = new Bitcoin(300); // Bitcoin with balance 300
bank.setNext(paypal);
paypal.setNext(bitcoin);
// Trying to pay using the first priority i.e., bank
try {
    bank.pay(259);
}
catch (error) {
    console.error(error);
}
// Output will be
// ==============
// Cannot pay using Bank. Proceeding ..
// Cannot pay using Paypal. Proceeding ..
// Paid 259 using Bitcoin
