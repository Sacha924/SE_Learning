interface Employee {
    getName(): string;
    setSalary(salary: number): void;
    getSalary(): number;
    getRoles(): string[];
}

class Developer implements Employee {
    private salary: number;
    private name: string;
    private roles: string[];

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
        this.roles = []; // Assuming roles is an array of strings
    }

    getName(): string {
        return this.name;
    }

    setSalary(salary: number): void {
        this.salary = salary;
    }

    getSalary(): number {
        return this.salary;
    }

    getRoles(): string[] {
        return this.roles;
    }
}

class Designer implements Employee {
    private salary: number;
    private name: string;
    private roles: string[];

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
        this.roles = []; // Assuming roles is an array of strings
    }

    getName(): string {
        return this.name;
    }

    setSalary(salary: number): void {
        this.salary = salary;
    }

    getSalary(): number {
        return this.salary;
    }

    getRoles(): string[] {
        return this.roles;
    }
}

class Organization {
    private employees: Employee[];

    constructor() {
        this.employees = [];
    }

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    getNetSalaries(): number {
        return this.employees.reduce((netSalary, employee) => netSalary + employee.getSalary(), 0);
    }
}

let sachatito : Developer = new Developer('John Doe', 12000)
let sachatito2 : Designer = new Designer('John Doe', 300)

let organization: Organization = new Organization();
organization.addEmployee(sachatito)
organization.addEmployee(sachatito2)

console.log("salaries sum:", organization.getNetSalaries())

