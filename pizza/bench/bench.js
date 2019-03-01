
let counter = 0
let t0 = Date.now()
let slices = []
while (Date.now() - t0 < 1000) {
    counter++
    slices.push([0,1,2,3])
}

console.log(counter/100000)
