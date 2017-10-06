// Facade
console.log('---------------- Facade design pattern -------------------------');

class SkiRent {
  rent(gender, height) {
    if (gender === 'male') {
      console.info(`you rent ski for ${gender} with proper ${height}`);
    } else if (gender === 'female') {
      console.info(`you rent ski for ${gender} with proper ${height}`);
    } else console.error(`you don't rent any ski`);
  }
}

class SkiLift {
  constructor(price) {
    this.price = price;
  }

  buy(age) {
    if (age > 15) {
      console.info(`your lift costs ${this.price}$`);
    } else if (age < 15) {
      console.info(`you enter for free`);
    } else console.error(`try again later...`);
  }
}

class Apartment {
  constructor(price) {
    this.price = price;
  }

  rent(age) {
    if (age > 16) {
      console.log(`you rent price is ${this.price}`);
    } else if (age < 16) {
      console.log(`you rent is free with parents`);
    } else console.log(`you cant rent, sorry...`);
  }
}

class TerminalBox {
  constructor() {
    this.apartment = new Apartment(25);
    this.skiLift = new SkiLift(10);
    this.ski = new SkiRent('male', 180);
  }

  startSkiing(person) {
    this.person = person;
    this.skiLift.buy(this.person.age);
    this.ski.rent(this.person.gender, this.person.height);
    this.apartment.rent(this.person.age);
  }
}

class Person {
  constructor(height, gender, age) {
    this._height = height;
    this._gender = gender;
    this._age = age;
  }

  get height() {
    return this._height;
  }
  get gender() {
    return this._gender;
  }
  get age() {
    return this._age;
  }
}

const terminal = new TerminalBox();
const person = new Person(180, 'male', 23);
terminal.startSkiing(person);
