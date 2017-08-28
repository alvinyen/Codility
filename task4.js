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

function getPrefixes (coordinatesArray) {
    const k = 3;
    let prefixes = [];
    for (let fixed=0; fixed<=coordinatesArray.length-k; fixed++) {
        for (let next=fixed+1; next<=coordinatesArray.length-k+1; next++) {
            let temp = [];
            temp.push(coordinatesArray[fixed], coordinatesArray[next]);
            prefixes.push(temp);
        }
    }
    
    return prefixes;
}

function listCombination (coordinatesArray) {
    const k = 3;
    const prefixes = getPrefixes(coordinatesArray);
    
    // console.log(prefixes);

    let result = [];
    
    for (let i=0; i<prefixes.length; i++) {
        const index = coordinatesArray.indexOf(prefixes[i][1]);
        for (let j=index+1; j<coordinatesArray.length; j++) {
            result.push([prefixes[i][0], prefixes[i][1], coordinatesArray[j]]);
        }
    }

    console.log(result);

    return result;
}

let coordinatesArray = ['A', 'B', 'C', 'D', 'E'];
listCombination(coordinatesArray);

coordinatesArray = [{x: 15, y: 20}, {x: 16, y: 21}, {x: 17, y: 22}, {x: 18, y: 23}, {x: 19, y: 24}];
listCombination(coordinatesArray);

