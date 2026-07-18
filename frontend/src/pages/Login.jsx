import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const Login = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault();

    try{
    //check password from DB*
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
      { email, password },
    );
    console.log(data);
    //assing token as cookie*
    if(data?.token)
    {
      localStorage.setItem("authToken",data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Login Successful");
      console.log("Token : ", localStorage.getItem("authToken"));
      console.log("Before navigate..");
      navigate("/dashboard");
      console.log("After navigate..");
    }
    }catch(err)
    {
      console.log("Login error:",err);

    }



  }


 return (
   <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
     <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
       <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label className="block mb-1 font-medium">Email</label>
           <input
             type="email"
             placeholder="Enter email"
             name="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
           />
         </div>

         <div>
           <label className="block mb-1 font-medium">Password</label>
           <input
             type="password"
             placeholder="Enter password"
             name="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             required
             className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
           />
         </div>

         <button
           type="submit"
           className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
         >
           Sign In
         </button>

         <p className="text-center text-gray-600">
           Don't have an account?{" "}
           <Link
             to="/register"
             className="text-cyan-600 font-medium hover:underline"
           >
             Sign Up
           </Link>
         </p>
       </form>
     </div>
   </div>
 );
}

export default Login