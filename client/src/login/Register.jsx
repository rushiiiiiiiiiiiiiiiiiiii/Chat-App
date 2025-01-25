import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    
    const sub = async (e) =>{

      e.preventDefault();
      var formdata = new FormData();
      formdata.append('name', name)
      formdata.append('image', image)
      formdata.append('phone', phone)
      formdata.append('password', password)
      
      await axios.post("http://localhost:3001/reg", formdata)
      .then(res=>{
        console.log(res.data)
        navigate('/')
      })
      .catch(err=>console.log(err))
    }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      {/* Container */}
      <div className="flex w-4/5 max-w-4xl overflow-hidden rounded-lg shadow-lg bg-white">
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-green-500">
          <div className="text-center text-white p-8">
            <h1 className="text-4xl font-bold">WhatsApp</h1>
            <p className="mt-4 text-lg">
              Fast, simple, and secure messaging for everyone.
            </p>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp Logo"
              className="mt-6 w-32 h-32 mx-auto"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-700">Create Your Account</h2>
          <p className="text-center text-gray-600 mt-2">Join WhatsApp Today!</p>

          <form className="mt-6" onSubmit={sub}>
            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                name='name'
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            {/* Profile Picture Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="profile-picture">
                Profile Picture
              </label>
              <input
                type="file"
                name='file'
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
                onChange={(e)=>setImage(e.target.files[0])}

              />
            </div>

            {/* Phone Number Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                name='phone'
                placeholder="+1234567890"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
                onChange={(e)=>setPhone(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name='password'
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                required
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
           <button 
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              Register
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-green-500 hover:underline">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
