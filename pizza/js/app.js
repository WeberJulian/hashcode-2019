var io = require("./io")
var validation = require("./validation")
var plotly = require('plotly')('julian78w', 'eKmfNHsJM6RTPwbTmZDC'); //By the time you read this key, it won't be valid anymore ;)
var files = ['a_example.in', 'b_small.in', 'c_medium.in', 'd_big.in']

var dataset = 0
var duration = 10
var [R, C, L, H, pizza] = io.load(files[dataset])

main()

function main() {
    let slices = []

    let t0 = Date.now()
    let slice
    let counter = -1

    let counters = []
    let scores = []
    let lengths = []

    let batch = Math.pow(R + C, 2)
    let flag = true

    while (Date.now() - t0 < duration && flag) {
        counter += 1
        slice = getRandomSlice()
        if (validSlice(slice, slices)) {
            slices.push(slice)
        }
        // if (counter / batch == Math.floor(counter / batch)) {
        //     scores.push(validation.countPoints(slices))
        //     counters.push(counter)
        //     lengths.push(slices.length)
        // }
    }

    let score = validation.countPoints(slices)
    console.log("score : " + score)

    if (io.checkBestScore(score, files[dataset])){
        io.export(slices, files[dataset], score)
    }

    // plotResults(counters, scores)
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomSlice() {
    let r = getRandomInt(0, R)
    let c = getRandomInt(0, C)
    return [
        r,
        c,
        r + getRandomInt(0, R - r),
        c + getRandomInt(0, C - c)
    ]
}

function validSlice(slice, slices) {
    if (!validation.goodSize(slice, [R, C, L, H])) {
        return false
    }
    if (!validation.enoughL(L, slice, pizza)) {
        return false
    }
    if (!validation.noOverlaps(slices, slice)) {
        return false
    }
    return true
}

function plotResults(counters, scores) {
    var data = [
        {
            x: counters,
            y: scores,
            type: "scatter"
        }
    ];
    var graphOptions = { filename: "pizza-slices", fileopt: "overwrite" };
    plotly.plot(data, graphOptions, function (err, msg) {
        console.log(msg.url);
    });
}
