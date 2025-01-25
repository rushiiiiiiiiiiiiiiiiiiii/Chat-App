import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [phone,  setPhone] = useState('')
    const [password,  setPassword] = useState('')
    const navigate = useNavigate()
    
    const log = async (e)=>{
        e.preventDefault()
        await axios.post('https://chat-app-server-lvyn.onrender.com/log',{phone,password})
        // await axios.post('http://localhost:3001/log',{phone,password})
        .then(res=>{
            console.log(res.data)
            sessionStorage.setItem("userid", res.data._id)
            navigate('/home')
        })
        .catch(err=>console.log(err))

    }

    axios.post
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100">
            {/* Container */}
            <div className="flex w-4/5 max-w-4xl overflow-hidden rounded-lg shadow-lg bg-white">
                {/* Left Section */}
                <div className="hidden md:flex md:w-1/2 items-center justify-center bg-green-500">
                    <div className="text-center text-white p-8">
                        <h1 className="text-4xl font-bold">WhatsApp</h1>
                        <p className="mt-4 text-lg">
                            Secure and simple login to stay connected.
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
                    <h2 className="text-2xl font-bold text-center text-gray-700">Log In</h2>
                    <p className="text-center text-gray-600 mt-2">Welcome back to WhatsApp!</p>

                    <form className="mt-6" onSubmit={log}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="+1234567890"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                required
                                name='phone'
                                onChange={(e)=>setPhone(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name='password'
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                required
                                onChange={(e)=>setPassword(e.target.value)}

                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <a href="/register" className="text-green-500 hover:underline">
                                Register Now
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
