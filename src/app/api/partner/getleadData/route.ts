// app/api/partner/getPropertiesbyID/route.ts

import { getServerCookieValue } from "@/function/cookie"; // Assuming this utility is available
import axios from "axios";
import { NextResponse } from "next/server";

// Use the server-side environment variable for your external backend URL
const EXTERNAL_BASE_URL = process.env.API_URL; // Or process.env.EXTERNAL_API_URL

export async function POST(request: Request) {
  try {
    // 1. Get the request body (which should contain the 'id')
    const { id } = await request.json();

    // 2. Get the authentication token securely from the server-side cookies
    const token = await getServerCookieValue();

    if (!token) {
      return NextResponse.json({ message: "Authentication required." }, { status: 401 });
    }

    // 3. Call your external backend service
    const externalResponse = await axios.post(
      `${EXTERNAL_BASE_URL}/api/user/getBookingforApprovalbyID`,
      { id }, // Send the ID in the body to the external API
      {
        headers: {
          "Authorization": `Bearer ${token}`, // Use the server-side token
          "Content-Type": "application/json",
        },
      }
    );

    // 4. Return the data and status from the external API to your client
    return NextResponse.json(externalResponse.data, { status: externalResponse.status });

  } catch (error) {
    console.error("API Route Error:", error);

    // Handle errors from the external service
    if (axios.isAxiosError(error) && error.response) {
      // Pass through the external API's error status and data
      return NextResponse.json(error.response.data, { status: error.response.status });
    }

    // Default error response
    return NextResponse.json(
      { message: "Internal Server Error while fetching properties." },
      { status: 500 }
    );
  }
}