const documentsService = require("../services/document.service")

exports.getDocuments = (req, res)=>{
    const documents = documentsService.getDocuments()
    res.json(documents)
}

exports.getDocumentText = (req, res)=>{
    const filename = req.params.filename
    const documentText = documentsService.getDocumentText(filename)

    res.json({
        documentText
    })
}