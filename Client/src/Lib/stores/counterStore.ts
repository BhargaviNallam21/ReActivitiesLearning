import { makeAutoObservable } from 'mobx';
export default class CounterStore {
  title = 'Counter Store';
  count = 40;
  event: string[] = [`Initial count is ${this.count}`];

  constructor() {
    makeAutoObservable(this);
  }
  increment = (amount = 1) => {
    this.count += amount;
    this.event.push(`Count incremented by ${amount}- new count is ${this.count}`);
  };
  decrement = (amount = 1) => {
    this.count -= amount;
    this.event.push(`Count decremented by ${amount}- new count is ${this.count}`);
  };
  get EventCount() {
    return this.event.length;
  }
}
