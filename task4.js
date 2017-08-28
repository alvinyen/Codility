function factorial (n) {
    if (n===0) return 1;
    return n * factorial(n-1);
}

// console.log(factorial(5));
// console.log(factorial(4));
// console.log(factorial(3));

function combination (n, k) {
    return factorial(n)/(factorial(n-k)*factorial(k));
}

// console.log(combination(5, 3));
// console.log(combination(8, 3));
// console.log(combination(3, 1));