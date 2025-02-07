"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
// import { useRouter } from 'next/router';

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const router = useRouter();
  const router = useRouter();

  //verify email
  const verifyEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/verifyemail", { token });
      if (response.data.success) {
        setVerified(true);
        toast.success("Verified email successfully");
        router.push("/login");
      } else {
        setError(true);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    setToken(urlToken || "");
  }, [token]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-gray-600 via-teal-200 to-blue-950">
      <h1 className="text-white font-bold text-3xl">Verify email</h1>
      <h2>
        {token
          ? `Please click on verified button for verify your email`
          : "No token"}
      </h2>

      {token && (
        <button
          onClick={verifyEmail}
          className="bg-white px-2 rounded-md py-1 text-lg"
          disabled={loading}
        >
          {loading ? "Loading...." : "Click here for verified email"}
        </button>
      )}
    </div>
  );
};

export default page;
