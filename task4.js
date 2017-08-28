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

function isPointsCollinear ( points )  {
    return (
        (points[0].y - points[1].y) / (points[0].x - points[1].x) === (points[0].y - points[2].y) / (points[0].x - points[2].x) 
    );
}

function howManyCollinearPoints ( combinations ) {
    let count = 0;
    for (let i = 0; i<combinations.length; i++) {
        if(isPointsCollinear(combinations[i])) {
            count++;
            console.log(combinations[i]);
        }
    }
    return count;
}

function process (coordinatesArray) {
    return -1;
}

let coordinatesArray = [
    {x: 0, y: 0}, 
    {x: 1, y: 1}, 
    {x: 2, y: 2}, 
    {x: 3, y: 3}, 
    {x: 3, y: 2},
    {x: 4, y: 2},
    {x: 5, y: 1}
];
listCombination(coordinatesArray);
console.log(howManyCollinearPoints(listCombination(coordinatesArray)));

