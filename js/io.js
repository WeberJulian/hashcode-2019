let fs = require('fs');

module.exports = {
    load: (file) => {
        let contents = fs.readFileSync("datasets/"+file, 'utf8')
        pizza = contents.split("\n")
        let [R, C, L, H] = pizza.splice(0, 1)[0].split(" ")
        pizza.splice(-1,1)
        return [parseInt(R), parseInt(C), parseInt(L), parseInt(H), pizza]
    },
    export: (slices, dataset, score) => {
        let filename = 'solution_' + dataset
        let scoreFile = 'score_' + dataset
        try{
            fs.unlinkSync("solutions/"+filename)
            fs.unlinkSync("solutions/scores/"+scoreFile)
        }catch(e){}
        fs.appendFileSync("solutions/"+filename, slices.length.toString() + "\n")
        slices.map((slice)=>{
            fs.appendFileSync("solutions/"+filename, aggregate(slice) + "\n")
        })
        fs.appendFileSync("solutions/scores/"+scoreFile, score.toString())
    },
    checkBestScore: (score, file) => {
        let scoreFile = 'score_' + file
        if (fs.existsSync("solutions/scores/"+scoreFile)) {
            let contents = fs.readFileSync("solutions/scores/"+scoreFile, 'utf8')
            let bestScore = parseInt(contents)
            if(score > bestScore){
                return true
            }
            else{
                return false
            }
        }
        else{
            return true
        }
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