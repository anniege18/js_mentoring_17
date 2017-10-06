//Observer
console.log('---------------- Observer design pattern -------------------------');

class Game {
  constructor(name) {
    this.subscribers = [];
    this._gameName = name;
    this._state = null;
    console.log(`${this._gameName} game was started!`);
  }

  set state(state) {
    this._state = state;
    this.notify();
  }

  get state() {
    return this._state;
  }

  get name() {
    return this._gameName;
  }

  notify() {
    this.subscribers.forEach(subscriber => subscriber.setState(this));
  }

  bet(Player) {
    this.subscribers.push(Player);
    console.log(`${Player.name} made bet for ${this.name}`);
  }

  reset() {
    this.subscribers = [];
  }

  win() {
    this.state = "gain";
    this.reset();
  }

  lose() {
    this.state = "loss";
    this.reset();
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.result = null;
    this.gameName = '';
  }

  setState(Game) {
    this.gameName = Game.name;
    this.result = Game.state;

    console.log(
      `Player with name ${this.name} is ${this.result} in ${this.gameName}`
    );
  }
}

  const Game1 = new Game('Soccer');
  const Game2 = new Game('Basketball');
  const Game3 = new Game('Racing');

  const Player1 = new Player('Mary');
  const Player2 = new Player('Ian');
  const Player3 = new Player('Andrea');
  const Player4 = new Player('Alex');

  Game1.bet(Player1);
  Game2.bet(Player2);
  Game3.bet(Player4);
  Game2.bet(Player3);

  Game1.win();
  Game2.lose();
  Game3.win();

