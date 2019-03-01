let fs = require('fs');

module.exports = {
    load: (file) => {
        let contents = fs.readFileSync("datasets/"+file, "utf8")
        let lines = contents.split("\n")
        lines.shift()
        lines.pop()
        let photos = []
        for(let i = 0; i < lines.length; i++){
            let line = lines[i].split(" ")
            photos.push({ori: line[0], tags: line.slice(2), ids: [i]})

        }
        return photos
    },
    export: (dataset, photos) => {
        let filename = 'solution_' + dataset
        try{
            fs.unlinkSync("solutions/"+filename)
        }catch(e){}
        fs.appendFileSync("solutions/"+filename, photos.length.toString() + "\n")
        photos.map((photo)=>{
            if(photo.ids.length == 1){
                fs.appendFileSync("solutions/"+filename, photo.ids[0] + "\n")
            }
            else{
                fs.appendFileSync("solutions/"+filename, photo.ids[0] + " " + photo.ids[1] + "\n")
            }
        })
    }
}