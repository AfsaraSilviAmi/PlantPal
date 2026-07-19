"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
export default function AIChat() {
  const [open, setOpen] = useState(false);
  const defaultMessage = {
  role:"assistant",
  content:"Hi 🌿 I am PlantPal AI. Ask me anything about plants!"
};
const suggestions=[
"Best beginner plants?",
"How often should I water plants?",
"Which plants are pet friendly?",
"Best indoor plants?"
];

const [messages,setMessages] = useState<any[]>([
 defaultMessage
]);

useEffect(()=>{

 const saved = localStorage.getItem("plantpal-chat");


 if(saved){
   setMessages(JSON.parse(saved));
 }


},[]);
useEffect(()=>{

 if(messages.length>1){
  localStorage.setItem(
    "plantpal-chat",
    JSON.stringify(messages)
  );
 }

},[messages]);

const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);
const [showSuggestions, setShowSuggestions] = useState(true);
const chatEndRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {

  chatEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });

}, [messages]);

const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = {
    role: "user",
    content: input,
  };

  const updatedMessages = [
    ...messages,
    userMessage,
  ];

  setMessages(updatedMessages);
  setInput("");
  setShowSuggestions(false);
  setLoading(true);


  // Add empty AI message first
  setMessages([
    ...updatedMessages,
    {
      role: "assistant",
      content: "",
    },
  ]);


  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messages: updatedMessages,
        }),
      }
    );


    if (!res.body) {
      throw new Error("No response body");
    }


    const reader = res.body.getReader();

    const decoder = new TextDecoder();


    let aiResponse = "";


    while(true){

      const {done, value} = await reader.read();


      if(done) break;


      const chunk = decoder.decode(value);


      aiResponse += chunk;


      setMessages([
        ...updatedMessages,
        {
          role:"assistant",
          content: aiResponse,
        },
      ]);

    }


  } catch(error){

    console.log(error);


    setMessages([
      ...updatedMessages,
      {
        role:"assistant",
        content:"Sorry, something went wrong 🌱",
      }
    ]);

  }

  finally{
    setLoading(false);
  }

};

  return (
    <>
     <motion.button
  onClick={() => setOpen(!open)}
  className="
fixed
bottom-6
right-6
h-16
w-16
rounded-full
bg-primary-green
text-white
shadow-[0_0_25px_rgba(89,183,106,.45)]
text-3xl
z-50
flex
items-center
justify-center
"
  animate={{
    y: [0, -8, 0],
    scale: [1, 1.06, 1],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  whileHover={{
    scale: 1.15,
    rotate: -10,
  }}
  whileTap={{
    scale: 0.9,
  }}
>
  🌿
</motion.button>

      {open && (
        <div className="
fixed
bottom-24
right-4
w-[calc(100vw-2rem)]
md:right-6
md:w-[360px]
h-[500px]
max-h-[75vh]
rounded-3xl
bg-white
shadow-2xl
border
z-50
flex
flex-col
">

         <div className="border-b p-4 font-bold text-lg flex justify-between">
  
  <span>
  🌿 PlantPal AI
  </span>

  <button
  onClick={()=>setOpen(false)}
  className="text-gray-400 hover:text-red-500"
  >
  ✕
  </button>

</div>
         
         <div 
className="
flex-1
overflow-y-auto
p-5
space-y-3
scrollbar-thin
"
>

{
messages.map((msg,index)=>(
  
<div
key={index}
className={`p-3 rounded-xl max-w-[80%]
${
msg.role==="user"
?
"ml-auto bg-primary-green text-white"
:
"bg-gray-100 text-gray-800"
}
`}
>
{msg.content}

</div>

))
}
<div ref={chatEndRef} />
{
loading && messages[messages.length-1].content === "" && (
<div className="bg-gray-100 px-4 py-3 rounded-xl w-fit">
  <span className="animate-bounce">●</span>
  <span className="animate-bounce delay-100 ml-1">●</span>
  <span className="animate-bounce delay-200 ml-1">●</span>
</div>
)
}

</div>
{
showSuggestions && (
<div className="
px-3
py-2
border-t
flex
gap-2
overflow-x-auto
scrollbar-hide
">

{
suggestions.map((item)=>(
<button
key={item}
onClick={()=>setInput(item)}
className="
whitespace-nowrap
text-xs
bg-green-50
text-primary-green
px-3
py-2
rounded-full
hover:bg-green-100
transition
"
>
{item}
</button>
))

}

</div>
)
}
<div className="border-t p-3 flex gap-2">

<input
value={input}
onChange={(e)=>setInput(e.target.value)}
onKeyDown={(e)=>{
 if(e.key==="Enter"){
  sendMessage();
 }
}}
placeholder="Ask about plants..."
className="flex-1 border rounded-xl px-3 py-2"
/>


<button
onClick={sendMessage}
className="bg-primary-green text-white px-4 rounded-xl"
>
Send
</button>


</div>
        </div>
        
      )}
    </>
  );
}