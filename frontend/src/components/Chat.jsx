import ReactMarkdown from "react-markdown";
import { useRef } from "react";
import { SendHorizontal } from "lucide-react";

export default function Chat({ userQuery, setUserQuery, setMessages, messages }) {
  const textareaRef = useRef(null);

  const sendMessage = async() => {
    if (!userQuery.trim()) return;

    const message = {
      sender: 'user',
      content: userQuery
    }
    
    setMessages(prev=>[...prev, message]);
    
    setUserQuery("");
    const res = await fetch("http://localhost:5000/chat", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            userQuery
        })
    })

    const data = await res.json();

    const ai_response = {
      sender: "bot",
      content: data.ans
    };

    setMessages(prev=>[...prev, ai_response])

    // Reset textarea height
    textareaRef.current.style.height = "auto";
  };

  const handleChange = (e) => {
    setUserQuery(e.target.value);

    const textarea = textareaRef.current;

    // Reset height before calculating new height
    textarea.style.height = "auto";

    // Grow until 120px
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      {/* Chat Area */}
      <div className="p-4 h-[80%] w-[95%] rounded-2xl bg-[#131313] flex flex-col gap-4 overflow-y-scroll">
        {
          messages.map((message, idx)=>(
            <div key={idx} className={`text-white p-2 rounded-lg min-w-[8rem] text-xl max-w-[35rem] w-fit ${message.sender==="user"?"self-end bg-[#ff2b2b]":"self-start bg-[#2B2B2B]"}`}><ReactMarkdown>{message.content}</ReactMarkdown></div>
          ))
        }
      </div>

      {/* Input */}
      <div className="relative w-[95%]">
        <textarea
          ref={textareaRef}
          rows={1}
          value={userQuery}
          placeholder="Type here..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="
            w-full
            resize-none
            overflow-y-auto
            rounded-2xl
            bg-[#131313]
            p-6
            pr-16
            text-xl
            text-white
            outline-none
          "
          style={{
            maxHeight: "200px",
          }}
        />

        <button
          onClick={sendMessage}
          className="
            absolute
            right-5
            bottom-5
            cursor-pointer
            rounded-full
            p-2
            transition
            hover:bg-white/10
          "
        >
          <SendHorizontal color="#ffffff" strokeWidth={1.75} size={24} />
        </button>
      </div>
    </div>
  );
}