const chunkIndex = require("../services/chunkIndex.service");
const { combineChunks } = require("./combineChunks.service");

function dotProduct(a, b){
    let sum = 0;
    
    for(let i = 0; i < a.length; i++){
        sum+=a[i]*b[i];
    }

    return sum;
}

function magnitude(vector){
    let sum  = 0;

    for(let value of vector){
        sum+=value*value;
    }

    return Math.sqrt(sum);
}

function cosineSimilarity(a, b){
    const dot = dotProduct(a, b);
    const magA = magnitude(a);
    const magB = magnitude(b);
    
    return dot/(magA*magB);
}

exports.getSimilarity = (queryEmbedding)=>{

    const allChunks = chunkIndex.getAllChunks();

    for(const chunk of allChunks){
        chunk.similarity = cosineSimilarity(
            queryEmbedding,
            chunk.embedding
        )
    }

    allChunks.sort(
        (a, b) => b.similarity - a.similarity
    )
    
    return allChunks;
}