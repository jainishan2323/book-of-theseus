// The function is divided into steps the Final step is the full function

// Pre step: usage
let promise = new Promise(function(resolve, reject) {
    resolve();
    reject()
});
promise.then(function resolveCb(val) { console.log('resolved value') });
promise.catch(function rejectCb(val) { console.log('rejected value') });

//  Also we can use something like this
Promise.resolve(100).then((val) => console.log('val will be 100'));
// Which means the function passed in Promise i.e executor can either be async or not

// Step 1: The base
function MyPromise(executor) {
    this.then = function(thenCb) {
        // TODO call the thenCb after executor
        return this;
    };
    this.catch = function(catchCb) {
        // TODO call the thenCb after executor
        return this;
    }

    function resolve(){};
    function reject(){};

    executor(resolve, reject);
}

// Step 2: Lets introduce the resolve and reject functions
function MyPromise(executor) {
    this.then = function(thenCb) {
        // TODO call the thenCb after executor
        return this;
    };
    this.catch = function(catchCb) {
        // TODO call the thenCb after executor
        return this;
    }

    function resolve(val){};
    function reject(err){};

    executor(resolve, reject);
}


// Step 3: the then and catch cb are initialized before even the function is called
// like so: promise.then(thenCb).catch(catchCb)
// We need to store them to our Promise for later use
// Also we added check for function in resolve and reject since we can use:
// Like so: Promise(function (res, rej) { res(100); rej(-100) } );
// We can't directly call resolve or reject until we have then or catch in below code
function MyPromise(executor) {
    let onResolve;
    let onReject;
    this.then = function(thenCb) {
        onResolve = thenCb;
        return this;
    };
    this.catch = function(catchCb) {
        onReject = catchCb;
        return this;
    }

    function resolve(val){
        if (typeof onResolve === 'function') {
            onResolve(val);
        }
    };
    function reject(err){
        if (typeof onReject === 'function') {
            onReject(err);
        }
    };

    executor(resolve, reject);
}
// This will work here
const p = new MyPromise(function executor(res, rej) {
    setTimeout(() => {
        res(100)
    }, 100)
});
p.then((value) => console.log('Value should be 100', value));

// But below will not work since resolve is called directly
// and it doesn't go to timer queue which was allowing .then to execute and set its cb
const p = new MyPromise(function executor(res, rej) {
    res(100)
});
p.then((value) => console.log('Value should be 100', value)); // will log undefined

// Step 3.1
// Below code will not work if resolve is called async
function MyPromise(promiseCallbackFn) {
    let value;
    let error;
    function resolve(val) {
        value = val;
    }
    function reject(err) {
        error = err;
    }
    this.then = function(thenCb) {
        thenCb(value)
        return this;
    }
    this.catch = function(catchCb) {
        catchCb(error)
        return this;
    }
    promiseCallbackFn(resolve, reject);
}

// **Step 4**
// To allow execution of resolve reject without async we need to set the .then and .catch cb then allow
// resolve reject to be called
// So we need to store the value of resolve(value) and use it for later 
function MyPromise(executor) {
    let onResolve;
    let onReject;
    let isCalled = false;
    let value;
    let error;
    function resolve(val){
        value = val;
        if (typeof onResolve === 'function' && !isCalled) {
            onResolve(val);
            isCalled = true;
        }
    };
    function reject(err){
        error = err;
        if (typeof onReject === 'function' && !isCalled) {
            onReject(err);
            isCalled = true;
        }
    };

    this.then = function(thenCb) {
        onResolve = thenCb;
        onResolve(value);
        return this;
    };
    this.catch = function(catchCb) {
        onReject = catchCb;
        onReject(error);
        return this;
    }

    executor(resolve, reject);
}

// Step 5:
// Add some extra values and state

function MyPromise(executor) {
    let onResolve;
    let onReject;
    let isCalled = false;
    let value;
    let error;
    let isFullfilled = false;
    let isRejected = false;
    function resolve(val){
        value = val;
        isFullfilled = true;
        if (typeof onResolve === 'function' && !isCalled) {
            onResolve(val);
            isCalled = true;
        }
    };
    function reject(err){
        error = err;
        isRejected = false;
        if (typeof onReject === 'function' && !isCalled) {
            onReject(err);
            isCalled = true;
        }
    };

    this.then = function(thenCb) {
        onResolve = thenCb;
        if (isFullfilled) {
            onResolve(value);
        }
        return this;
    };
    this.catch = function(catchCb) {
        onReject = catchCb;
        if (isRejected) {
            onReject(error);
        }
        return this;
    }

    executor(resolve, reject);
}

PromisePolyFill.all = (promises) => {
    let fulfilledPromises = [],
      result = [];
  
    function executor(resolve, reject) {
      promises.forEach((promise, index) =>
        promise
          .then((val) => {
  
            fulfilledPromises.push(true);
            result[index] = val;
  
            if (fulfilledPromises.length === promises.length) {
              return resolve(result);
            }
          })
          .catch((error) => {
            return reject(error);
          })
      );
    }
    return new PromisePolyFill(executor);
  };