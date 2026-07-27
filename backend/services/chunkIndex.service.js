const combineChunks  = require("./combineChunks.service")

let allChunks = []

exports.load = ()=>{
    allChunks = combineChunks.combineChunks();
}

exports.getAllChunks = ()=>{
    return allChunks;
}

exports.addChunks = (chunks) =>{
    allChunks.push(...chunks)
}