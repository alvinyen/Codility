// 00:01:07,400-234-090
// 00:05:01,701-080-080
// 00:05:00,400-234-090
// 400-234-090 // 6m7s
// 701-080-080 // 5m1s

// 00:04:59 以下 // 3cents/s
// 00:01:07 => 67*3 = 201cents

// 00:05:00 以上 // 150cents/min
// 00:05:00 => 150*5 = 750cents
// 00:05:01 => 150*6 = 900cents

// 最長的那一通免費，如果多過一通，那就選電話數值最小的那一通免費

// 0~299 => 3cents/s
// >300 => 150cents/min
// 00:05:00 => Math.ceil(300)=5 => 150*5 = 750cents
// 00:05:01 => Math.ceil(301)=6 => 150*6 = 900cents

// 0<=hh<=99
// 0<=mm/ss<=59

function countTime (str) {
    const secondsPerHour = 60 * 60;
    const secondsPerMin = 60;
    const times = str.split(':');

    // ss -> times[2]
    // mm -> times[1]
    // hh -> times[0]

    // console.log(`h in s: ${secondsPerHour*parseInt(times[0])}`);
    // console.log(`m in s: ${secondsPerMin*parseInt(times[1])}`);
    // console.log(`s in s: ${parseInt(times[2])}`);

    return parseInt(
            times[2]) + 
            secondsPerMin * parseInt(times[1]) + 
            secondsPerHour * parseInt(times[0]);
}

function preProcess (log) {
    const logs = log.split('\n');
    let map_number_seconds = new Map();
    
    for (let i=0; i<logs.length; i++) {
        const number = logs[i].split(',')[1].replace(/-/g, '');
        if (map_number_seconds.has(number)) {
            const cumulativeTime = map_number_seconds.get(number);
            const thisTime = countTime(logs[i].split(',')[0]);
            map_number_seconds.set(number, cumulativeTime + thisTime);
        } else {
            map_number_seconds.set(number, countTime(logs[i].split(',')[0]));
        }
    }
    return map_number_seconds;
}

function findKey_MaxCumuTimeLog (map_number_seconds) {
    let max = -1;
    let keysInNum_maxValue = [];
    for (let [key, value] of map_number_seconds.entries()) {
        if ( value > max ) {
            max = value;
            keysInNum_maxValue = [ parseInt(key) ];
        } else if ( value === max ) {
            keysInNum_maxValue.push(parseInt(key));
        }
    }
    return keysInNum_maxValue.length > 1 ? Math.min(...keysInNum_maxValue) : keysInNum_maxValue.pop();
}

function bill (map_number_seconds) {
    let result = 0;
    for (let value of map_number_seconds.values() ) {
        if ( value<300 ) {
            result += value * 3; // 3cents/s
        } else {
            result += Math.ceil(value/60) * 150; // 150cents/m
        }
    }
    return result;
}

function process (log) {
    const map_number_seconds = preProcess(log);
    const key = (findKey_MaxCumuTimeLog(map_number_seconds)).toString();
    map_number_seconds.delete(key);
    return bill(map_number_seconds);
}

let log = `00:01:07,400-234-090
             00:05:01,701-080-080
             00:05:00,400-234-090
             00:06:00,901-989-000
             00:00:07,901-989-000`;

console.log(process(log));

log = `00:01:07,400-234-090
        00:05:01,701-080-080
        00:05:00,400-234-090`;

console.log(process(log));


