"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookieValue } from "@/function/cookie";

export default function useRedirectByRole() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [detail, setdetail] = useState(false);
  const BASEURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let isMounted = true;

    const checkRole = async () => {
      try {
        let user = null;
        const storedData = localStorage.getItem("partnerdata");

        // Check if user data exists in localStorage
        if (storedData) {
          user = JSON.parse(storedData);
        } else {
          // Fetch from API if not in localStorage
          const res = await axios.get(`${BASEURL}/api/user/profile`, {
            headers: {
              "Authorization": `Bearer ${getCookieValue()}`  
            }
          });
          localStorage.setItem("partnerdata", JSON.stringify(res.data));
          user = res.data;
        }

        // Check if user details are incomplete
        if (isMounted && user) {
          if (user.city == null || user.contact == null) {
            console.log("User details incomplete");
            setdetail(true);
          } else {
            setdetail(false);
          }
        }

      } catch (err) {
        console.error("Error checking role:", err);
        if (isMounted) {
          router.replace("/auth/login");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkRole();
    
    return () => {
      isMounted = false;
    };
  }, [router, BASEURL]);

  return { loading, detail };
}