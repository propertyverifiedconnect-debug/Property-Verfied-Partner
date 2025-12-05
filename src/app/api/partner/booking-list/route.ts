// app/api/partner/profile/route.ts

// This file is a standard API Route Handler (Runs on the Server)
import { getServerCookieValue } from "@/function/cookie";
import axios from "axios";

import { NextResponse } from "next/server";


const EXTERNAL_BASE_URL = process.env.EXTERNAL_API_URL; 



export async function GET(request: Request) {
  try {
    // 1. Get the token on the server side
    const token = await getServerCookieValue();
     
console.log( "Route token" ,token)
    // 2. Call your external backend service
    const res = await axios.get(`${EXTERNAL_BASE_URL}/api/user/getApprovedBooking`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  console.log(res.data)
    // 3. Return the data to the client
    return NextResponse.json(res.data, { status: 200 });

  } catch (error) {
    console.error("API Route Error:", error);
    // Handle specific errors (e.g., authentication)
    return NextResponse.json(
      { message: "Authentication Failed or Data Error" },
      { status: 401 }
    );
  }
}