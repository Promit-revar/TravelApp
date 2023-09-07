import React, { useState, useEffect, FC } from "react";
import { getChats, adminChats, userChats } from "@/lib/action";
import {Send} from 'lucide-react';
import { InfinitySpin, ThreeDots } from "react-loader-spinner";
import Spinner from "../Spinner";
import qtlogo from "../../public/qt_logo.png";
import Image from "next/image";

interface chatProps {
  tripId: string;
  user: string;
  profile: string;
}



const ChatComponent: FC<chatProps> = ({ tripId, user, profile }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadChat, setLoadChat] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));



	
  useEffect(() => {
    getChats(tripId)
      .then((data) => {
        //console.log(data.chat);

        if(data.chat){
          setMessages(data.chat.chats);
        }

        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  setTimeout(() => {
    getChats(tripId)
      .then((data) => {
        if(data.chat){
          setMessages(data.chat.chats);
        }
      })
      .catch((err) => console.log(err));
  }, 30 * 1000);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setLoadChat(true);
      if (userData.isAdmin) {
        
        adminChats(tripId, { message: input })
          .then((data) => {
            setMessages([...messages, { message: input, id: "admin" }]);
          setLoadChat(false);
          })
          .catch((err) => alert("Unable to send message"));
      } else {
        userChats(tripId, { message: input })
          .then((data) => {
            setMessages([...messages, { message: input, id: "user" }]);
            setLoadChat(false);
          })
          .catch((err) => alert("Unable to send message"));
      }
      setInput("");
    }
  };
  if(!isLoading && userData.isAdmin && messages.length===0){
    return <p> Chat has not been initiated yet for this trip!</p>
  }
  else{
  return (
    <div className="chat-container">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 " style={{minHeight:"50vh"}}>
      {isLoading && <div style={{ display: 'flex',justifyContent:"center", alignItems:"center"}}><InfinitySpin color="#009688"/></div> }
  { !isLoading  &&    
	<div className="flex flex-col flex-grow w-full md:w-8/12  bg-white shadow-xl rounded-lg overflow-hidden">
    
		{userData.isAdmin && <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
    {messages.map((message, index) => (
    <div key={index}>
    {message.id === 'user' && <div  className="flex w-full mt-2 space-x-3 max-w-xs">
    {profile? (<div ><img src={profile} className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300"/></div>)
    :(<svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"    // Increase the width to make the icon larger
        height="10"   // Increase the height to make the icon larger
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300" // Adjust the icon's size
      >
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>)}
				<div>
					<div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
						<p className="text-sm">{message?.message} </p>
					</div>
					{/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
				</div>
			</div>}
      { message?.id === 'admin' &&
			<div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
				<div>
					<div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
						<p className="text-sm">{message?.message}</p>
					</div>
					{/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
				</div>
				<div ><img src={userData?.profile} alt={userData.first_name[0]} className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300"/></div>
			</div>}
      </div>))}
      {/* {loadChat && <ThreeDots />} */}
		</div>}
		{!userData.isAdmin && <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
    {messages.map((message, index) => (
    <div key={index}>
    {message.id === 'admin' && <div  className="flex w-full mt-2 space-x-3 max-w-xs">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"    // Increase the width to make the icon larger
        height="10"   // Increase the height to make the icon larger
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300" // Adjust the icon's size
      >
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
				<div>
					<div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
						<p className="text-sm">{message?.message} </p>
					</div>
					{/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
				</div>
			</div>}
      { message?.id === 'user' &&
			<div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
				<div>
					<div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
						<p className="text-sm">{message?.message}</p>
					</div>
					{/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
				</div>
				{userData.profile? (<div ><img src={profile} alt={userData.first_name[0]} className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300"/></div>)
    :(<svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"    // Increase the width to make the icon larger
        height="10"   // Increase the height to make the icon larger
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300" // Adjust the icon's size
      >
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>)}
			</div>}
      </div>))}
      {/* {loadChat && <div className="bg-blue-600 rounded-lg flex flex-row justify-center"> <ThreeDots color="#fff" /> </div>} */}
		</div>}
		<div className="bg-gray-300 p-4 ">
      <div className="flex bg-white px-3 rounded flex-row items-center gap-1 w-full">
      
			<input 
          className="flex items-center h-10 border-none !outline-none w-full rounded px-3 text-sm"
          type="text" 
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}/>
      {!loadChat && <Send onClick={handleSubmit}/>}
      {loadChat && <Spinner />}
      
      </div>
		</div>
	</div>}
</div>
      {/* <div
        className="chat-messages max-h-40 overflow-y-auto scrollbar-w-2 scrollbar-track-gray-300 scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          marginLeft: "10%",
          marginRight: "20%",
        }}
      >
        {messages.map((message, index) => (
          <div key={index} className="flex justify-between space-y-2 "  style={{ marginRight: "10px" }}>
            {userData.isAdmin && (
              <>
                {message?.id === "user" && (
                  <div className="user-message w-2/5 bg-black rounded-lg p-2 text-white ml-8">
                    <strong>{message?.message}</strong>
                  </div>
                )}
                {message?.id === "admin" && (
                  <div className="admin-message bg-lightgray rounded-lg p-2 ml-8">
                    <strong>{message?.message}</strong>
                  </div>
                )}
              </>
            )}
            {!userData.isAdmin && (
              <>
                {message?.id === "admin" && (
                  <div className="admin-message bg-black rounded-lg p-2 text-white flex justify-start ml-8">
                    <strong>{message?.message}</strong>
                  </div>
                )}
                {message?.id === "user" && (
                  <div className="user-message bg-lightgray rounded-lg p-2 flex justify-end ml-8">
                    <strong>{message?.message}</strong>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div> */}
      {/* <form
        onSubmit={handleSubmit}
        className="input-form fixed bottom-32 left-0 right-0 flex items-center justify-center p-4 bg-white"
      >
        <input
          className="input-field w-full  md:w-8/12 resize-none border border-gray-400 rounded-md p-2"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="submit"
          value="Send"
          className="send-button py-2.5 px-5 ml-4 text-sm font-medium text-gray-900 bg-green-500 rounded-lg border border-green-400 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        />
      </form> */}
    </div>
  );
    }
};

export default ChatComponent;
