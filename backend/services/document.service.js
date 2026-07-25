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