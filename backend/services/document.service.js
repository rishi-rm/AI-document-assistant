const e = require("express")
const fs = require("fs")
const path = require("path")

exports.getDocuments = () => {
    const uploadsPath = path.join(
        __dirname,
        '../uploads'
    )

    const files = fs.readdirSync(uploadsPath)

    return files.map(file => ({
        filename: file
    }));
}

exports.getDocumentText = (filename)=>{

    const txtName = path.basename(filename, ".pdf") + ".txt"

    const txtPath = path.join(
        __dirname,
        "../documents",
        txtName
    )

    return fs.readFileSync(txtPath, "utf8")
}

// console.log(__dirname)