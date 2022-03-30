function addOne() {
    let count = 1;
    function callback() {
        count++;
        return callback;
    }
    callback.getValue = function() {
        return count;
    }
    return callback;
}