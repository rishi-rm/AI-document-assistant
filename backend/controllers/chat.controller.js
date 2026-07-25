const embeddingService = require("../services/embedding.service");

exports.chatController = async (req, res) => {

    const { userQuery } = req.body;

    const { embeddings } =
        await embeddingService.getEmbeddings([userQuery]);

    const queryEmbedding = embeddings[0];

    res.json({
        queryEmbedding
    });

};