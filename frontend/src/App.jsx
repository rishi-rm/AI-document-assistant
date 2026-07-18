import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react"

export default function App() {
  const [extractedText, setExtractedText] = useState("")
  const [filesList, setFilesList] = useState([])
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      alert("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);   
    
    const res = await fetch("http://localhost:5000/upload", {
      method:"POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);

    await getFiles();
    // console.log(data.pdfText)
    // setExtractedText(data.pdfText)
  }

  const getFiles = async()=>{
    const res = await fetch("http://localhost:5000/documents")
    const data = await res.json()
    setFilesList(data)
    console.log(data)
  }

  const getDocumentText = async(file)=>{
    const filename = file.filename
    const res = await fetch(`http://localhost:5000/documents/${filename}`)
    const data = await res.json()
    console.log(data);

    setExtractedText(data.documentText)
  }

  useEffect(()=>{
    getFiles()
  }, [])


  return (
    <div className="flex flex-col m-4">
      <input type="file" name="pdf" id="pdf" accept=".pdf" ref={fileInputRef} />
      <button className="w-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
      onClick={handleUpload}
      >
        Upload
      </button>

      <div className="border rounded flex flex-col gap-2 p-2">
        {
          filesList.map((file, idx)=>(
            <button key={idx} className="bg-gray-300 rounded text-xl p-2 w-max cursor-pointer"
            onClick={()=>{getDocumentText(file)}}
            >{file.filename}</button>
          ))
        }
      </div>

      <textarea name="showExtractedText" id="showExtractedText" className="border border-black rounded-md min-h-[30rem] w-[50rem] p-2" readOnly
      value={extractedText}
      ></textarea>

      <div>

      </div>
    </div>
  )
}