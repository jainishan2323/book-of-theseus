const memoize = (func) => {
    const results = {};
    return (...args) => {
      const argsKey = JSON.stringify(args);
      if (!results[argsKey]) {
        results[argsKey] = func(...args);
      }
      return results[argsKey];
    };
  };
  
  const fibonacci = memoize((n) => {
    // if n is equal to 1 return the first term 1
    if (n == 1) {
      return 1;
    }
    // if n is equal 2 1 return the second term 1
    else if (n == 2) {
      return 1;
    }
  
    // else n is larger than two, return the sum of the previous two terms
    else 
    return fibonacci(n - 1) + fibonacci(n - 2);
  });
  // print the fifth term in the sequence
  console.log(fibonacci(50));



//   Memoize function
function slowFunction(a, b) {
    for (let i = 0; i < 1000000000; i++) {};
    return a*b;
}

// memoize takes a function
function memoizeIt(fn) {
    const results = {};
    return (...args) => {
        const key = JSON.stringify(args);
        if (!results[key]) {
            results[key] = fn(...args);
        }
        return results[key];
    }
}