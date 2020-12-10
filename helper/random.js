pp = JSON.stringify(randomIntFromInterval())

function randomIntFromInterval() {
    // min and max included 
    return Math.floor(Math.random() * (1000000000000 - 100000000000 + 1) + 100000000000);

}

console.log(typeof(pp))