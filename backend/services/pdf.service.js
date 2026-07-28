const fs = require("fs")
const path = require("path")
const { PDFParse } = require("pdf-parse")
const embeddingService = require("./embedding.service")
const chunkIndex = require("./chunkIndex.service")
exports.getChunks = async (file) => {

    console.log(file)

    const parser = new PDFParse({ url: file.path })
    const pdfData = await parser.getText()

    const pdfText = pdfData.text;
    let chunks = [];
    const CHUNK_SIZE = 1000;

    let current = 0;
    while (current < pdfText.length) {
        let end = Math.min(current + CHUNK_SIZE, pdfText.length)

        let chunk = pdfText.slice(current, end)

        chunks.push({
            source_file: file.originalname,
            chunkIndex: chunks.length,
            text: chunk,
        });

        current = end;
    }
    console.log("chunks done")
    const chunkTexts = chunks.map(chunk => chunk.text);
    const embeddings = await embeddingService.getEmbeddings(chunkTexts);

    console.log("embeddings done")

    for (let i = 0; i < chunks.length; i++) {
        chunks[i].embedding = embeddings.embeddings[i];
    }

    const fileName = path.basename(file.path, ".pdf") + ".chunks.json";

    const chunkFileName = path.join(
        __dirname,
        "../chunks",
        fileName
    )

    console.log(chunkFileName)

    const jsonString = JSON.stringify(chunks, null, 2);
    fs.writeFileSync(chunkFileName, jsonString, 'utf8');
    console.log("file saved")

    chunkIndex.addChunks(chunks);

    return pdfData
}