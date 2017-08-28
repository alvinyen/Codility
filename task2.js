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

const log = `00:01:07,400-234-090\n00:05:01,701-080-080\n00:05:00,400-234-090`;

console.log(preProcess(log));
