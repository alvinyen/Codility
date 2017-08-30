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

    // console.log(result);

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
            // console.log(combinations[i]);
        }
    }
    return count;
}

function process (coordinatesArray) {
    if (combination(coordinatesArray.length, 3) > 100000000) return -1;

    return howManyCollinearPoints(listCombination(coordinatesArray));
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

console.log(process(coordinatesArray));

// 算出一個斜率上有幾條線，這裡可以用到cache做類似map的功能，時間複雜度為(logn)
//取任意兩個點計算斜率的時間為N^2，存到cache裡
//這邊時間複雜度就會是N^2*logn
//假設求出一個斜率上有N個線，代表這個斜率上有N+1個點
//根據每個斜率上有幾個點就能得出這個斜率的總組合數
//將每個組合相加就等於答案
//組合算法 C N 取3，這樣剛好符合題目的要求

