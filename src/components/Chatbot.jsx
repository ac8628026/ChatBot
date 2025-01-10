import { useState } from "react";
import { sendMessage } from "../APIs/Giminiapi";
import { useTheme } from '../ThemeContext';
import "./chatbot.css";
import send_icon from "./send_icon.png";
import PropagateLoader from "react-spinners/ScaleLoader"

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoding, setisLoding] = useState(false)
  const { isDarkMode } = useTheme();

  const handleSend = async () => {
    if (!input) return;
    setisLoding(true);
    console.log("loading true");
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    
    try {
      const botResponse = await sendMessage(input);
      setMessages((prev) => [
        ...prev,
        { text: botResponse.response.text(), sender: "bot" },
      ]);
      
    } catch (error) {
      console.error("Failed to send message:", error);
    }
    setisLoding(false);
    console.log("loading false");
  };

  return (
    <div className="flex flex-col items-center h-[90%] p-5 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow w-full max-w-4xl">
          <h1 className={`text-5xl text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            How may I help you, today...
          </h1>
         
          <div className="w-full max-w-2xl mt-8">
            <div className={`flex items-center w-full ${isDarkMode ? 'bg-stone-700' : 'bg-gray-200'} rounded-full px-4`}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className={`text-xl w-full ${isDarkMode ? 'text-white' : 'text-gray-900'} py-3 px-2 resize-none overflow-y-auto bg-transparent focus:outline-none`}
                placeholder={isLoding? "" : "Write a message..."}
                rows={1}
                style={{
                  maxHeight: "10rem",
                  minHeight: "55px",
                  lineHeight: "1.5",
                }}
              />
             {isLoding ? (
                <PropagateLoader color="#cac7c7" />
              ) : (
                input.trim() && (
                  <button onClick={handleSend} className="ml-2">
                    <img className="w-9" src={send_icon} alt="send" />
                  </button>
                )
              )}

            </div>
          </div>
        </div>
      ) : (
        <>
          <div className={`messages w-full max-w-4xl flex-grow flex flex-col ${isDarkMode ? 'text-white' : 'text-gray-900'}  mb-24`}>
            {messages.map((msg, index) => {
              if (msg.sender === "bot" && msg.text.includes("\n")) {
                const contentParts = msg.text
                  .split("\n")
                  .filter((part) => part.trim() !== "");

                return (
                  <div
                    key={index}
                    className={`bot-msg px-6 py-2 text-xl rounded-full m-3 text-left ${
                      isDarkMode ? '' : 'light-mode-bot-msg'
                    }`}
                  >
                    {contentParts.map((part, idx) => (
                      <p key={idx} className="mb-2">
                        {part}
                      </p>
                    ))}
                  </div>
                );
              }

              return (
                <div
                  key={index}
                  className={`px-6 py-2 text-xl rounded-[2rem] m-3 ${
                    msg.sender === "user" 
                      ? `user-msg ${isDarkMode ? '' : 'light-mode-user-msg'}` 
                      : `bot-msg ${isDarkMode ? '' : 'light-mode-bot-msg'}`
                  }`}
                >
                  {msg.text}
                </div>
              );
            })}
          </div>

          <div className="fixed  bottom-8 w-full max-w-2xl mx-auto">
            <div className={`flex items-center w-full ${isDarkMode ? 'bg-stone-700' : 'bg-gray-200'} rounded-full px-4`}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className={`text-xl w-full ${isDarkMode ? 'text-white' : 'text-gray-900'} py-3 px-2 resize-none overflow-y-auto bg-transparent focus:outline-none`}
                placeholder= {isLoding? "" : "Write a message..."}
                rows={1}
                style={{
                  maxHeight: "10rem",
                  minHeight: "55px",
                  lineHeight: "1.5",
                }}
              />
             {isLoding ? (
                <PropagateLoader color="#cac7c7" />
              ) : (
                input.trim() && (
                  <button onClick={handleSend} className="ml-2">
                    <img className="w-9" src={send_icon} alt="send" />
                  </button>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;