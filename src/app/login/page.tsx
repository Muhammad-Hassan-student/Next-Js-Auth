"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
   
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  //cend request to signin
  const onsignin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/login", user);
      console.log(response.data);
      if (response.data.success) {
        console.log(response.data);
        toast.success(response.data.message);
        router.push('/');
        setLoading(false)
      } else {
        toast.error(response.data.message)
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
     
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setDisabled(false);
    }
  }, [user]);
  return (
    <div className="min-h-screen bg-white-800 text-blue  justify-center px-36 py-12">
      <h1 className="text-center text-6xl font-bold">Sign Up</h1>
      <div className="flex flex-col gap-y-8 justify-center items-center  py-24 ">
        {loading && <h2 className="text-green-500 text-lg font-mono">Processing</h2>}
       

        <div className="flex justify-center items-center gap-x-3 w-[200px]">
          <label htmlFor="email" id="email">
            Email:
          </label>
          <input
            type="email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="email@gmail.com"
            className="px-6 mr-[-30px] py-1 outline-teal-500 rounded-md  bg-transparent border border-b-2 border-yellow-400"
          />
        </div>

        <div className="flex justify-center items-center gap-x-3 w-[200px]">
          <label htmlFor="password" id="password">
            Password:
          </label>
          <input
            type="password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
            placeholder="********"
            className="px-6 py-1 text-blue placeholder:text-blue  outline-teal-500 rounded-md  bg-transparent border border-b-2 border-yellow-400"
          />
        </div>
        <button
          className="ms-5 px-12 py-1 bg-gray-300 text-lg rounded-lg text-black font-semibold"
          onClick={onsignin}
          disabled={loading || disabled}
          type="submit"
        >
          {disabled ? "Fill the form" : "Sign up"}
        </button>
      </div>
    </div>
  );
};

export default page;
