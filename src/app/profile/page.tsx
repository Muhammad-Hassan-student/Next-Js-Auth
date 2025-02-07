"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


function page() {
  // const router =useRouter();
  const [data,setData] = useState("");
 
 //get user data from token where make by me route and getdatafromtoken.ts 
 const getData = async () => {
  try {
    const response = await axios.post("/api/user/me");
    if(response.data.success){
      setData(response.data.data._id);
    }
  } catch (error) {
    console.log(error);
  }
 }
 useEffect(() => {
  getData()
 }, [])

 //logout functionality
 const logout = async () => {
  try {
    const response = await axios.get("/api/user/logout");
    if(response.data.success){
      toast.success(response.data.data.message);
    }else{
      console.log(response.data.message);
    }
  } catch (error) {
    console.log(error);
  }
 }
  return (
    <div className=' flex flex-col items-center justify-center gap-y-4 mb-10 min-h-screen bg-gray-900'>
      <h1 className='text-white lobster-two-bold text-7xl '>Profile Page</h1>
      <hr />
      <h3 className='text-green-700 bg-orange-400 text-lg'>{data ? data : "Nothing"}</h3>
      <hr />
      {data ?     <><Link href={`/profile/${data}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"> 
  Get Data
</Link> <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
  Logout
</button></> : <Link href={"/login"} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full">Login</Link>}
    

    </div>
  )
}

export default page