const embeddingService = require("../services/embedding.service");
const sortedCosine = require("../services/sortedCosine.service");
const llmService = require('./llm.service')

exports.chatService = async(userQuery) => {
    const { embeddings } =
        await embeddingService.getEmbeddings([userQuery]);

    const queryEmbedding = embeddings[0];

    const sortedChunks = sortedCosine.getSimilarity(queryEmbedding);

    let context = ""
    for(let i = 0; i < 5; i++){
        context+=sortedChunks[i].text;
    }


    const answer = await llmService.generateAnswer(
        context,
        userQuery
    )

    return {
        ans: answer,
        src: sortedChunks[0].source_file
    }
}