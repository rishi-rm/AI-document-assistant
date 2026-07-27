const embeddingService = require("../services/embedding.service");
const sortedCosine = require("../services/sortedCosine.service");

exports.chatService = async(userQuery) => {
    const { embeddings } =
        await embeddingService.getEmbeddings([userQuery]);

    const queryEmbedding = embeddings[0];

    const sortedChunks = sortedCosine.getSimilarity(queryEmbedding);

    console.log(sortedChunks);
    return sortedChunks;

}