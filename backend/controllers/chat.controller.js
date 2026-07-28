const chatService = require("../services/chat.service")
exports.chatController = async (req, res) => {

    const { userQuery } = req.body;

    const response = await chatService.chatService(userQuery);

    res.json(response);
};