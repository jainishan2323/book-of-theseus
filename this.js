// Polyfill for bind

// Polyfill call
// fn.call(context, args)

Function.prototype.myCall = function(context, ...args) {
    // instead of property fnName use a randomMath string
    context.fnName = this;
    const result = context.fnName(...args);
    delete context.fnName;
    return result;
}

// fn.apply(context, [args])
Function.prototype.myApply = function(context, arr) {
    context.fnName = this;
    const result = context.fnName(...arr);
    delete context.fnName;
    return result;
}

// fn.bind(context)
Function.prototype.myBind = function(context) {
    const boundedTargetFn = this;
    return function boundedFn(args) {
        boundedTargetFn.apply(context, ...args)
    }
}