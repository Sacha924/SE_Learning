var Developer = /** @class */ (function () {
    function Developer(name, salary) {
        this.name = name;
        this.salary = salary;
        this.roles = []; // Assuming roles is an array of strings
    }
    Developer.prototype.getName = function () {
        return this.name;
    };
    Developer.prototype.setSalary = function (salary) {
        this.salary = salary;
    };
    Developer.prototype.getSalary = function () {
        return this.salary;
    };
    Developer.prototype.getRoles = function () {
        return this.roles;
    };
    return Developer;
}());
var Designer = /** @class */ (function () {
    function Designer(name, salary) {
        this.name = name;
        this.salary = salary;
        this.roles = []; // Assuming roles is an array of strings
    }
    Designer.prototype.getName = function () {
        return this.name;
    };
    Designer.prototype.setSalary = function (salary) {
        this.salary = salary;
    };
    Designer.prototype.getSalary = function () {
        return this.salary;
    };
    Designer.prototype.getRoles = function () {
        return this.roles;
    };
    return Designer;
}());
var Organization = /** @class */ (function () {
    function Organization() {
        this.employees = [];
    }
    Organization.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Organization.prototype.getNetSalaries = function () {
        return this.employees.reduce(function (netSalary, employee) { return netSalary + employee.getSalary(); }, 0);
    };
    return Organization;
}());
var sachatito = new Developer('John Doe', 12000);
var sachatito2 = new Designer('John Doe', 300);
var organization = new Organization();
organization.addEmployee(sachatito);
organization.addEmployee(sachatito2);
console.log("salaries sum:", organization.getNetSalaries());
