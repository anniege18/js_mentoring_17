//Adapter design pattern
console.log('---------------- Adapter design pattern -------------------------');

class OldPowerSocket {
  constructor(adapter) {
    this.adapter = adapter;
  }

  plugSocket() {
    console.warn('Old type socket connected to ...');
    this.adapter.plugSocket();
  }
}

class ChinaPlugSocket {
  constructor() {
    this._socketType = 'China';
  }

  set voltage(voltage) {
    this._voltage = voltage;
  }

  set shape(shape) {
    this._shape = shape;
  }

  get socketType() {
    return this._socketType;
  }

  plugChinaSocket() {
    console.info(`${this._socketType} type plug with ${this._voltage} and ${this._shape} is plugged in`);
  }
}

class USAPlugSocket {
  constructor() {
    this._socketType = 'USA';
  }

  set voltage(voltage) {
    this._voltage = voltage;
  }

  set shape(shape) {
    this._shape = shape;
  }

  get socketType() {
    return this._socketType;
  }
  plugUSASocket() {
    console.info(`${this._socketType} type plug with ${this._voltage} and ${this._shape} is plugged in`);
  }
}

class Adapter {
  constructor(socket) {
    this.socket = socket;
  }

  plugSocket() {
    switch (this.socket.socketType) {
      case 'China':
        this.socket.voltage = '120V';
        this.socket.shape = 'square';
        break;
      case 'USA':
        this.socket.voltage = '180V';
        this.socket.shape = 'hexagon';
        break;
      default:
        break;
    }
    this.socket[`plug${this.socket.socketType}Socket`]();
  }
}

let plug = new USAPlugSocket();
let adapter = new Adapter(plug);
new OldPowerSocket(adapter).plugSocket();

plug = new ChinaPlugSocket();
adapter = new Adapter(plug);
new OldPowerSocket(adapter).plugSocket();
