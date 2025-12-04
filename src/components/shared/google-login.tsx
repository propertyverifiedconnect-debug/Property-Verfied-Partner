"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function GoogleLogin() {
   
    const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("google-login-btn"),
        {
          theme: "outline",
          size: "large"
        }
      );
    }
  }, []);

   const BaseURL = process.env.NEXT_PUBLIC_API_URL


  async function  handleGoogleResponse(response) {
    const credential = response.credential;

    const payload = JSON.parse(atob(credential.split(".")[1]));
    console.log("Google User:", payload);

    const email = payload.email
    const name = `${payload.given_name} ${payload.family_name} `
   

    // Send to your backend
    try{

        const res = await axios.post(`${BaseURL}/api/auth/google`, {
            email , 
            name ,
            role:"partner"
        })

         Cookies.set("client_token_partner",res.data.jwt, {
  expires: 1,        
  secure: true,     
  sameSite: "strict"
  });
  router.push("/dashboard/partner");

        console.log(res)
    }catch(err)
    {
         console.error(err)
    }
  }

  return (
    <div>
      <div id="google-login-btn" className="mt-2 rounded"></div> {/* Google renders button here */}
    </div>
  );
}
