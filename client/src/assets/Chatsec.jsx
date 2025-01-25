import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';  // Import Socket.io client

const Chatsec = () => {
  const [user, setUser] = useState([]);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const sid = sessionStorage.getItem('userid');
  const { id } = useParams();

  // Create ref to the chat container
  const chatContainerRef = useRef(null);

  // Create socket connection on component mount
  useEffect(() => {
    const socket = io('http://localhost:3001');  // Connect to the server

    // Listen for new messages
    socket.on('newMessage', (data) => {
      setChat((prevChat) => [...prevChat, data.chat]);
    });

    // Clean up the socket connection when the component unmounts
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getuserdet/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const fetch = () => {
    axios
      .get(`http://localhost:3001/getchat?id=${id}&sid=${sid}`)
      .then((res) => {
        setChat(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch();
  }, [id, sid]);

  const send = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/chat', { id, sid, message })
      .then(() => {
        setMessage('');
        fetch();
      })
      .catch((err) => console.log(err));
  };

  // Scroll to the bottom whenever chat changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-green-500 text-white shadow">
        <div className="flex items-center gap-4">
          <img
            className="w-12 h-12 rounded-full"
            src={`http://localhost:3001/${user.image}`}
            alt="User"
          />
          <h2 className="text-lg font-bold">{user.name}</h2>
        </div>
        <div className="flex space-x-4">
          <button className="p-2 rounded-full bg-green-600 hover:bg-green-700">
            <i className="fas fa-search"></i>
          </button>
          <button className="p-2 rounded-full bg-green-600 hover:bg-green-700">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef} // Assign ref to the container
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scrollbar-hidden"
      >
        {chat?.map((data, i) => (
          <div
            key={i}
            className={`flex ${data.sid === sid ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                data.sid === sid ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
              } max-w-sm break-words`}
            >
              {data.message}
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t border-gray-300 bg-white">
        <form className="flex" onSubmit={send}>
          <input
            type="text"
            placeholder="Type a message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatsec;
