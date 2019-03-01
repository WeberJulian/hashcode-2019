
let fs = require('fs');
let contents = fs.readFileSync("solution_e_shiny_selfies.txt", "utf8")
let lines = contents.split("\n")
lines.shift()
lines.pop()
for(let i = 0; i < lines.length; i++)
console.log(lines)