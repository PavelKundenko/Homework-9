export class Mediator {
  subscribers = {};

  subscribe = (event, callback) => {
    this.subscribers[event] = this.subscribers[event] || [];
    this.subscribers[event].push(callback);
  };

  unsubscribe = (event, callback) => {
    const subscriberIndex = this.subscribers[event].indexOf(callback);
    if (subscriberIndex > -1) {
      this.subscribers[event].splice(subscriberIndex, 1);
    }
  };

  publish = (event, data) => {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(callback => callback(data));
    }
  };

  get methods () {
    return { subscribe: this.subscribe, unsubscribe: this.unsubscribe, publish: this.publish };
  }
}
