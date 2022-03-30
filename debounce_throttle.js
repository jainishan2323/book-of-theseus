// debounce will delay the execution of script
// usage: const debouncedFn = debounce(fn, delay);
// If the function is called again it will clear the previous function from queue and add new instance

function debounce(fn, delay) {
    let timer;
    return function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn, delay);
    }
}

// For calling debounce with bounded context
function debounce(fn, delay) {
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(context, args) }, delay);
    }
}

// Throttle
function throttle(fn, delay) {
    let timer = null;
    return function() {
        if (timer === null) {
            setTimeout(() => {
                fn();
                timer = null;
            }, delay);
        }
    }
}


const obj = {
    name: 'Ishan',
    display(greet) {
        return `${greet} ${this.name}`;
    }
}