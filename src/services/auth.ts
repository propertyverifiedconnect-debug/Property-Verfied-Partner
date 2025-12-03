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
    
    console.log(res)
    return res.data;
  } catch (error: unknown) {
    const err = error as AxiosError<any>;

    console.error("Login error:", err);

    // ❗ server actions MUST throw an Error, not objects
      throw new Error(
    err.response?.data?.message ?? "Login failed. Try again."
  );
  }
}
