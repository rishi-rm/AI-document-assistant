const pdfService = require("../services/pdf.service.js");
exports.uploadPDF = async (req, res) => {

    try{
        const pdfData = await pdfService.getChunks(req.file)
        const text = pdfData.text

        console.log(pdfData)
        console.log(pdfData.text)

        res.json({
            pdfText: pdfData.text,
            success:true,
            filename: req.file.originalname,
            characters: text.length
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Failed to extract PDF"
        })
    }

};