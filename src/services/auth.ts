"use server";

import axios, { AxiosError } from "axios";


const BASEURL = process.env.API_URL; // ✅ server-side env (not public)

interface LoginProps {
  email: string;
  password: string;
  role: string;
}

export async function loginUser({ email, password, role }: LoginProps) {
  try {
    const res = await axios.post(
      `${BASEURL}/api/auth/login`,
      { email, password, role },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    console.log(res.data);
    return res.data;
  } catch (error: unknown) {
    const err = error as AxiosError<any>;

    console.error("Login error:", err);

    // Extract the error message from the server response
    const errorMessage = 
      err.response?.data?.message || 
      err.response?.data?.error || 
      err.message || 
      "Login failed. Please try again.";

    throw new Error(errorMessage);
  }
}