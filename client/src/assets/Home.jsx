import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]); // List of all users
  const [userone, setUserone] = useState([]); // Current user info
  const [userid, setUserid] = useState(null);
  const [invalue, setInvalue] = useState(''); // Search input value
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const id = sessionStorage.getItem('userid');

  useEffect(() => {
    axios
      // .get('http://localhost:3001/getuser/' + id)
      .get('https://chat-app-server-lvyn.onrender.com/getuser/' + id)
      .then((res) => {
        setUser(res.data); // Set users data
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      // .get('http://localhost:3001/getuserone/' + id)
      .get('https://chat-app-server-lvyn.onrender.com/getuserone/' + id)
      .then((res) => {
        setUserone(res.data); // Set current user data
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const openmodal = (id) => {
    setOpen(true);
    setUserid(id);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Handle logout functionality here (e.g., clear sessionStorage, redirect to login)
    sessionStorage.clear();
    window.location.href = '/'; // Redirect to login page (change the URL to your login page)
  };

  // Filter users based on search input
  const filteredUsers = user.filter((data) => {
    return data.name.toLowerCase().includes(invalue.toLowerCase());
  });

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 h-[100vh] bg-white border-r border-gray-200">
        <div className="p-4 flex justify-between border-b border-gray-200">
          <h1 className="text-2xl font-bold text-green-500">WhatsApp</h1>
          <div className="relative">
            <img
              className="w-12 h-12 rounded-full flex-shrink-0 cursor-pointer"
              src={`https://chat-app-server-lvyn.onrender.com/${userone?.image}`}
              // src={`http://localhost:3001/${userone?.image}`}
              alt="User"
              onClick={toggleDropdown} // Toggle dropdown on profile click
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                <div className="p-4">
                  <h3 className="font-bold text-gray-700">{userone.name}</h3>
                  <p className="text-sm text-gray-500">{userone.phone}</p>
                </div>
                <hr />
                <div
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => alert('Edit Profile')} // Replace with actual edit profile action
                >
                  Edit Profile
                </div>
                <div
                  className="py-2 px-4 text-red-500 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search or start new chat"
            value={invalue}
            onChange={(e) => setInvalue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
        </div>
        {/* Chat List */}
        <div className="overflow-y-auto h-full">
          {filteredUsers.map((data, i) => (
            <Link to={`/chatsec/${data._id}`} key={i}>
              <div
                onClick={() => openmodal(data._id)}
                className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
              >
                <img
                  className="w-12 h-12 rounded-full flex-shrink-0"
                  src={`https://chat-app-server-lvyn.onrender.com/${data.image}`}
                  // src={`http://localhost:3001/${data.image}`}
                  alt="User"
                />
                <div className="ml-4">
                  <h3 className="font-bold text-gray-700">{data.name}</h3>
                  {sessionStorage.getItem("userid") ? (
                    <p className="text-sm text-green-500">Online</p>
                  ) : (
                    <p className="text-sm text-red-500">Offline</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div
        className={`flex-1 bg-gray-50 ${open ? 'block' : 'hidden'} md:flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-green-500 text-white shadow">
          <h2 className="text-xl font-bold">Welcome to WhatsApp</h2>
          <div className="flex space-x-4">
            <button className="p-2 rounded-full bg-green-600 hover:bg-green-700">
              <i className="fas fa-search"></i>
            </button>
            <button className="p-2 rounded-full bg-green-600 hover:bg-green-700">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>

        {/* Chat Placeholder */}
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-700">
              Select a chat to start messaging
            </h3>
            <p className="text-gray-500 mt-2">
              Stay connected with friends and family.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
