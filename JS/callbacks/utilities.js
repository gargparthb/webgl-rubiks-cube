// compares two colors
function equalColors(c1, c2) {
    return arraysMatch(c1.levels, c2.levels);
}

// checks two arrays equality with order
function arraysMatch(arr1, arr2) {

    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // Check if all items exist and are in the same order
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    // Otherwise, return true
    return true;

};

// takes out the zeros from an array
function removeZero(array) {
    return array.filter(i => i != 0);
}

// gets all whole numbers between n and m in an array
function allNumsBetween(n, m) {
    let result = [];

    for (i = n; i <= m; i++) {
        result.push(i);
    }

    return result;
}

function last(array) {
    return array[array.length - 1]
}

function waitFor(condition, callback) {
    if (!condition()) {
        setTimeout(waitFor.bind(null, condition, callback), 10);
    } else {
        callback();
    }
}

// converts raw seconds to a nice string
function displayTime(n) {
    let allSeconds = n.toFixed(1);
    let mins = Math.floor(allSeconds / 60);
    let secs = allSeconds - mins * 60;

    if (mins < 1) {
        return secs.toFixed(1);
    } else {
        return `${mins}:${secs.toFixed(1)}`
    }
}