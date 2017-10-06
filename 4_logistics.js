//Factory Method
console.log('---------------- Factory design pattern -------------------------');

class LogisticsCompany {

  createVehicle(type) {
    let vehicle;

    if (type === 'car') {
      vehicle = new Car();
    } else if (type === 'ship') {
      vehicle = new Ship();
    }

    vehicle.type = type;

    vehicle.run = () => {
      console.log(`${vehicle.type} transport ${vehicle.parcel}`);
    };
    return vehicle;
  }
}

class Car {
  constructor() {
    this.parcel = 'car parcel';
  }
}

class Ship {
  constructor() {
    this.parcel = 'ship parcel';
  }
}

const vehicles = [];
const Company = new LogisticsCompany();

vehicles.push(Company.createVehicle('car'));
vehicles.push(Company.createVehicle('ship'));
vehicles.push(Company.createVehicle('car'));
vehicles.push(Company.createVehicle('ship'));

vehicles.forEach(vehicle => vehicle.run());


