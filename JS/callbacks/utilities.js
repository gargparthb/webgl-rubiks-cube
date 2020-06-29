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
        window.setTimeout(waitFor.bind(null, condition, callback), 10); /* this checks the flag every 100 milliseconds*/
    } else {
        callback();
    }
}