import { useEffect, useRef, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

const AIChat = () => {
  const casualGreetingsB = [
    "Hey there! What can I do for you?",
    "Yo! Need some help?",
    "Hiya! What's up?",
    "Hello! How can I assist you today?",
    "Sup! How's it going?",
    "Arre hello! Batao kya help chahiye?",
    "Haanji, boliye! Kis cheez ka jugaad chahiye?",
    "Hi bhai! Kya scene hai aaj?",
    "Namaste ji! Main ready hoon, aap batao kya karna hai?",
    "O bhai! Kaise madad kar sakta hoon?"
  ];

  const casualGreetingsG = [
    "Hey there! What can I do for you?",
    "Yo! Need some help?",
    "Hiya! What's up?",
    "Hello! How can I assist you today?",
    "Sup! How's it going?",
    "Arre hello! Batao kya help chahiye?",
    "Haanji, boliye! Kis cheez ka jugaad chahiye?",
    "Hi Madam Ji! Kya scene hai aaj?",
    "Namaste ji! Main ready hoon, aap batao kya karna hai?",
    "O Madam Ji! Kaise madad kar sakta hoon?"
  ];


  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("mateai-chat-history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved messages:", e);
      }
    }
    const randomIndex = Math.floor(Math.random() * casualGreetingsB.length);
    const randomGreeting = casualGreetingsB[randomIndex];

    return [{ role: "assistant", content: randomGreeting }];
  });

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  
  // Save messages to localStorage on change
  useEffect(() => {
    localStorage.setItem("mateai-chat-history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);




  // Used For Text Rendering (laTex formatting)
  const renderContent = (text) => {
    const latexRegex = /(\\\[.*?\\\]|\\\(.*?\\\)|\$\$.*?\$\$|\$.*?\$|\\[a-zA-Z]+\{.*?\})/g;
    const parts = text.split(latexRegex);

    return parts.map((part, index) => {
      try {
        if (latexRegex.test(part)) {
          let clean = part
            .replace(/^\$\$?/, "")
            .replace(/\$\$?$/, "")
            .replace(/^\\\[/, "")
            .replace(/\\\]$/, "")
            .replace(/^\\\(/, "")
            .replace(/\\\)$/, "")
            .replace(/\\boxed\{(.+?)\}/, "$1");

          const html = katex.renderToString(clean, {
            throwOnError: false,
            displayMode: part.includes("$$") || part.includes("\\["),
          });

          return (
            <div
              key={index}
              className="latex-render"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        } else {
          const formatted = part


            // Headings
            .replace(/^### (.*$)/gim, "<h3>$1</h3>")
            .replace(/^## (.*$)/gim, "<h2>$1</h2>")
            .replace(/^# (.*$)/gim, "<h1>$1</h1>")


            // Lists
            .replace(/^\s*[-*] (.*)/gim, "<li>$1</li>")
            .replace(/^\d+\. (.*)/gim, "<li>$1</li>")
            .replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>")


            // Horizontal line
            .replace(/^---$/gim, "<hr/>")


            // Bold, italic, inline code
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/`(.*?)`/g, "<code>$1</code>")


            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')


            // Line breaks
            .replace(/\n/g, "<br/>");

          return (
            <span
              key={index}
              className="text-render"
              dangerouslySetInnerHTML={{ __html: formatted }}
            />
          );
        }
      } catch (err) {
        return <span key={index}>{part}</span>;
      }
    });
  };




  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer ",
          "Content-Type": "taskmaster",
          "HTTP-Referer": "taskmaster.com",
          "X-Title": "<YOUR_SITE_NAME>",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-thinking-exp-1219:free",
          messages: newMessages,
        }),
      });

      const data = await response.json();
      console.log(data);

      const rawReply = data.choices[0]?.message?.content || "Sorry, I couldn't understand that.";
      const formattedReply = rawReply.replace(/\\\\/g, "\\"); // clean up escaped backslashes

      setMessages([...newMessages, { role: "assistant", content: formattedReply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "Error: Something went wrong." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="card ai-chat">
      <h2 className="smart-assistant">🤖 <span style={{ color: "orange" }}>Mate</span>AI</h2>

      <div className="outer-box"> 
        {messages.map((msg, index) => (
          <div key={index} className={`chat-box ${msg.role === "user" ? "user-msg" : "bot-msg"}`}>
            <p>{renderContent(msg.content)}</p>
          </div>
        ))}

        {isTyping && (
          <div className="chat-box bot-msg">
            <p className="typing">
              <span></span><span></span><span></span>
            </p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <input
        type="text"
        className="chat-input"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

    </div>
  );
};

export default AIChat;
