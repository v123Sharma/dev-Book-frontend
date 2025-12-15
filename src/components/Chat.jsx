import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/webSocket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const Chat = () => {
    const {targetUserId} = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage , setNewMessage] = useState("");
   // console.log(targetUserId)
    const user = useSelector(store=>store.user);
    const userId = user?._id;

 
    const fetchChatMessages=async()=>{
      const chat =  await axios.get(BASE_URL+"/chat/"+targetUserId, 
        {withCredentials:true}
      );
      const chatData = chat?.data?.messages.map((msg)=>{
        const {senderId,text} =msg
        return {
          firstName : senderId?.firstName,
          text 
        }
      })
      setMessages(chatData);
    }


 useEffect(()=>{
   fetchChatMessages();
 }, [])   


useEffect(()=>{
    if(!userId){
        return
    }
         const socket = createSocketConnection();
         socket.emit("joinChat", 
            {
                userId,
                targetUserId,
                firstName : user.firstName
            });
            socket.on("messageRecieved", ({firstName, text})=>{
                console.log(firstName , "-", text)
                setMessages((messages)=> [...messages, {firstName, text}])
            });

         return ()=>{
            socket.disconnect();
         }
    },[userId, targetUserId]);

   const sendMessage=()=>{
    const socket = createSocketConnection();
    socket.emit("sendMessages",{
         firstName: user.firstName,
         userId,
         targetUserId,
         text: newMessage
    });
    setNewMessage("");
   } 

  return (
   <div className="min-h-screen flex justify-center bg-gray-100 pt-6 pb-24">

  <div className="w-full md:w-1/2 h-[65vh] bg-white rounded-lg shadow-lg flex flex-col">

    {/* Header */}
    <h1 className="p-4 border-b text-center font-semibold">
      Chat
    </h1>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((msg, index)=>{
        return (
            <div key={index} className={"chat " + 
            (user.firstName===msg.firstName ? "chat-end" : "chat-start")}>
               <div className="chat-header">
                {msg.firstName}
               <time className="text-xs opacity-50">2 hours ago</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
             <div className="chat-footer opacity-50">Seen</div>
            </div>
        );

      })}
    </div>

    {/* Input */}
    <div className="border-t p-3 bg-white">
      <div className="flex items-center gap-2">
        <input
         value ={newMessage}
         onChange={(e)=>setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full outline-none
           focus:ring-2 focus:ring-blue-500"/>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold"
          onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Chat
