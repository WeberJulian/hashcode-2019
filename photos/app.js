var io = require("./io")

const dataset = 3
const datasets = ["a_example.txt", "b_lovely_landscapes.txt", "c_memorable_moments.txt", "d_pet_pictures.txt", "e_shiny_selfies.txt"]
const file = datasets[dataset]

const pairingtime = 1000
const rangeGlissante = 1000

let photos = io.load(file)
let photoVertical = photos.filter((photo)=>{if(photo.ori == "V")return true})
photos = photos.filter((photo)=>{if(photo.ori == "H")return true})


photoVertical.sort((a,b)=>{if(a.tags.length < b.tags.length)return true})

if(photoVertical.length%2 != 0){
    photos.push(photoVertical.splice((photoVertical.length+1)/2, 1)[0])
}
for (let i = 0; i < photoVertical.length/2; i++){
    photos.push(combine(photoVertical[i], photoVertical[photoVertical.length - i - 1]))
}

photos = shuffle(photos)

let result = [photos.splice(0, 1)[0]]
let score = 0
let max
let indiceMax
let range
let L = photos.length
for (let i = 0; i < L; i++){
    max = 0
    indiceMax = 0
    range = mini(photos.length, rangeGlissante)
    for(let j = 0; j < range; j++){
        score = calScore(result[i], photos[j])
        if(score >= max){
            max = score
            indiceMax = j
        }
    }
    result.push(photos.splice(indiceMax, 1)[0])
}

io.export(file, result)

function combine(pic1, pic2){
    let photo = pic1
    photo.ids.push(pic2.ids[0])
    for(let i = 0; i < pic2.tags.length; i++){
        if(photo.tags.indexOf(pic2.tags[i]) == -1){
            photo.tags.push(pic2.tags[i])
        }
    }
    return photo
}

function calScore(pic1, pic2){
    let temp1 = [...pic1.tags]
    let temp2 = [...pic2.tags]
    let inter = temp1.filter(x => temp2.includes(x)).length
    temp1 = [...pic1.tags]
    let left = temp1.filter(x => !temp2.includes(x)).length
    let right = temp2.filter(x => !temp1.includes(x)).length
    return minim(inter, left, right)
}
function mini(a,b){
    if(a>b)
        return b
    return a
}
function minim(a,b,c){
    return mini(a, mini(b,c))
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

