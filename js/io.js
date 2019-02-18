let fs = require('fs');

module.exports = {
    load: (file) => {
        let contents = fs.readFileSync("datasets/"+file, 'utf8')
        pizza = contents.split("\n")
        let [R, C, L, H] = pizza.splice(0, 1)[0].split(" ")
        pizza.splice(-1,1)
        return [parseInt(R), parseInt(C), parseInt(L), parseInt(H), pizza]
    },
    export: (slices, dataset) => {
        let filename = 'solution_' + dataset
        try{
            fs.unlinkSync("solutions/"+filename)
        }catch(e){}
        fs.appendFileSync("solutions/"+filename, slices.length.toString() + "\n")
        slices.map((slice)=>{
            fs.appendFileSync("solutions/"+filename, aggregate(slice) + "\n")
        })
    }
}

function aggregate(slice){
    let line = ''
    for (let i = 0; i < slice.length; i++){
        line += slice[i]
        line += ' '
    }
    return line
}