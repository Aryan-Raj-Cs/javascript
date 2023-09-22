class EventEmitter {
    constructor() {
      this.events = {};
    }
  
    on(eventName, listener) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(listener);
    }
  
    emit(eventName, ...args) {
      if (this.events[eventName]) {
        for (const listener of this.events[eventName]) {
          listener(...args);
        }
      }
    }
  
    removeListener(eventName, listenerToRemove) {
      if (this.events[eventName]) {
        this.events[eventName] = this.events[eventName].filter(
          (listener) => listener !== listenerToRemove
        );
      }
    }
  }
  
  // Example usage:
  const myEmitter = new EventEmitter();
  
  function greet(name) {
    console.log(`Hello, ${name}!`);
  }
  
  function farewell(name) {
    console.log(`Goodbye, ${name}!`);
  }
  
  myEmitter.on('greet', greet);
  myEmitter.on('farewell', farewell);
  
  myEmitter.emit('greet', 'Alice'); // Outputs: Hello, Alice!
  myEmitter.emit('farewell', 'Alice'); // Outputs: Goodbye, Alice!
  
  myEmitter.removeListener('greet', greet);
  myEmitter.emit('greet', 'Bob'); // greet listener removed, no output

  