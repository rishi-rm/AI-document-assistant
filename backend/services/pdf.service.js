const fs = require("fs")
const path = require("path")
const { PDFParse } = require("pdf-parse")
const {embeddingService} = require("./embedding.service")

exports.extractText = async (filePath) => {
    const parser = new PDFParse({ url: filePath })
    const pdfData = await parser.getText()

    const pdfText = pdfData.text;
    let chunks = [];
    const CHUNK_SIZE = 1000;

    let current = 0;
    while (current < pdfText.length) {
        let end = Math.min(current + CHUNK_SIZE, pdfText.length)

        let chunk = pdfText.slice(current, end)

        chunks.push({
            chunkIndex: chunks.length,
            text: chunk,
        });

        current = end;
    }
    const chunkTexts = chunks.map(chunk => chunk.text);
    const embeddings = await embeddingService.getEmbeddings(chunkTexts);

    for (let i = 0; i < chunks.length; i++) {
        chunks[i].embedding = embeddings.embeddings[i];
    }

    const fileName = path.basename(filePath, ".pdf") + ".chunks.json";

    const chunkFileName = path.join(
        __dirname,
        "../chunks",
        fileName
    )

    const jsonString = JSON.stringify(chunks, null, 2);
    fs.writeFileSync(chunkFileName, jsonString, 'utf8');

    return pdfData
}