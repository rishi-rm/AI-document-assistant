const app = require("./app");
const chunksIndex = require("../services/chunkIndex.service")
const PORT = 5000;

chunksIndex.load();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});