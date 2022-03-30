const PubSub = {
    events: {},
    subscribe(eventName, fn) {
        if (this.events[eventName]) {
            this.events[eventName].push(fn);
        } else {
            this.events[eventName] = [fn];
        }
    },
    trigger(eventName, data) {
        if (this.events[eventName] && Array.isArray(this.events[eventName])) {
            this.events[eventName].forEach((fn) => {
                fn(data);
            });
        }
    }
}