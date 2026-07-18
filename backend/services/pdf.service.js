const fs = require("fs")
const path = require("path")
const { PDFParse } = require("pdf-parse")

exports.extractText = async (filePath)=>{
    const parser = new PDFParse({ url: filePath })
    const pdfData = await parser.getText()

    const textFileName = path.basename(filePath, ".pdf") + ".txt"

    const textPath = path.join(
        __dirname,
        "../documents",
        textFileName
    )

    fs.writeFileSync(textPath, pdfData.text)

    const pdfText = pdfData.text;
    let chunks = [];
    let chunkSize = 1000;

    let current = 0;
    while(current < pdfText.length){
        let end = Math.min(current+chunkSize, pdfText.length)
        let chunk = pdfText.slice(current, end)
        chunks.push({
        chunkIndex: chunks.length,
        text: chunk
    });

        current = end;
    }

    console.log("CHUNKS ARRAY: ");

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
