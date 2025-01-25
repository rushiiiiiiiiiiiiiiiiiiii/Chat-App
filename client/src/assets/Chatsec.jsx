import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const Chatsec = () => {
  const [user, setUser] = useState([]);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');
  const sid = sessionStorage.getItem('userid');
  const { id } = useParams();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const socket = io('https://chat-app-server-lvyn.onrender.com');
    // const socket = io('http://localhost:3001');
    socket.on('newMessage', (data) => {
      setChat((prevChat) => [...prevChat, data.chat]);
    });
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    axios
      .get(`https://chat-app-server-lvyn.onrender.com/getuserdet/${id}`)
      // .get(`http://localhost:3001/getuserdet/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const fetchChat = () => {
    axios
      .get(`https://chat-app-server-lvyn.onrender.com/getchat?id=${id}&sid=${sid}`)
      // .get(`http://localhost:3001/getchat?id=${id}&sid=${sid}`)
      .then((res) => setChat(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchChat();
  }, [id, sid]);

  const sendMessage = (e) => {
    e.preventDefault();
    axios
      .post('https://chat-app-server-lvyn.onrender.com/chat', { id, sid, message })
      // .post('http://localhost:3001/chat', { id, sid, message })
      .then(() => {
        setMessage('');
        fetchChat();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-green-600 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <img
            className="w-12 h-12 rounded-full object-cover"
            // src={`http://localhost:3001/${user.image}`}
            src={`https://chat-app-server-lvyn.onrender.com/${user.image}`}
            alt="User"
          />
          <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          {sessionStorage.getItem("userid")?<p className="text-sm font-semibold text-white">Online</p>:
          <p className="text-sm font-semibold text-red-500">Offline</p>}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-green-500 hover:bg-green-700">
            <i className="fas fa-search"></i>
          </button>
          <button className="p-2 rounded-full bg-green-500 hover:bg-green-700">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scrollbar-thin scrollbar-thumb-green-500"
      >
        {chat.map((data, i) => (
          <div
            key={i}
            className={`flex ${data.sid === sid ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl shadow-md ${
                data.sid === sid ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
              } max-w-[75%]`}
            >
              {data.message}
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 border-t bg-white">
        <form className="flex items-center" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white font-medium rounded-r-lg hover:bg-green-600 transition-all"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatsec;
