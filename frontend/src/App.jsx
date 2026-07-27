import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import Chat from "./components/Chat";

export default function App() {
  const [extractedText, setExtractedText] = useState("");
  const [filesList, setFilesList] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [messages, setMessages] = useState([]);
  /* message:{
  sender: user || bot,
  content: xyz
}*/

  const getFiles = async () => {
    try {
      const res = await fetch("http://localhost:5000/documents");
      const data = await res.json();
      setFilesList(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const handleUpload = () => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "application/pdf";

    inputElement.onchange = async () => {
      const file = inputElement.files?.[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append("pdf", file);

        const res = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        console.log(data);

        if (data.pdfText) {
          setExtractedText(data.pdfText);
        }

        await getFiles();
      } catch (err) {
        console.error(err);
      }
    };

    inputElement.click();
  };

  return (
    <div className="min-h-screen w-screen flex bg-[#ffffff]">
      {/* Left Panel */}
      <div className="flex flex-col items-center justify-center gap-4 min-h-screen w-[30vw]">
        <div
          className="p-4 px-8 pr-10 rounded-xl cursor-pointer w-max flex gap-2 text-xl bg-red-500 font-bold text-white"
          onClick={handleUpload}
        >
          <Upload color="#ffffff" strokeWidth={3} />
          <h3>Upload a PDF file</h3>
        </div>

        {filesList.length > 0 && (
          <div className="border rounded w-[90%] overflow-hidden flex flex-col gap-2 p-2">
            {filesList.map((file, idx) => (
              <button
                key={idx}
                className="bg-gray-300 rounded text-xl p-2 cursor-pointer text-left"
              >
                {file.filename}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="flex flex-col min-h-screen w-[70vw] border-l-2 border-[#131313]">
        <Chat
          userQuery={userQuery}
          setUserQuery={setUserQuery}
          setMessages={setMessages}
          messages={messages}
        />
      </div>
    </div>
  );
}