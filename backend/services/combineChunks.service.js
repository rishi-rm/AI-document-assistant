const fs = require("fs");
const path = require("path");

exports.combineChunks = () => {
    const chunksDir = path.join(__dirname, "../chunks");

    const chunkFiles = fs.readdirSync(chunksDir);

    if (chunkFiles.length === 0) return [];

    let allChunks = [];

    for (const chunkFile of chunkFiles) {
        const filePath = path.join(chunksDir, chunkFile);

        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

        allChunks.push(...data);
    }

    console.log("loading chunks done");

    return allChunks;
};