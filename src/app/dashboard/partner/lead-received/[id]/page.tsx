"use client";
import React, { useState, useEffect } from "react";
import {
 
  ArrowLeft,
 
  Phone,
  Bot,
  Download,
  Book,
  CircleCheck,
  Car,
  Shield,
  MapPin,
  Link2,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import {
  Dialog,
  DialogContent,
 
  DialogTrigger,
  
} from "@/components/ui/dialog";

import Link from "next/link";
import { Inter } from "next/font/google";
import Nav from "@/components/layout/nav";
import { Badge } from "@/components/ui/badge";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
 import { useRouter } from "next/navigation";
import { getCookieValue } from "@/function/cookie";
import PropertyDetailsPage from "@/components/shared/property-details";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Type Definitions
interface User {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface ApprovedProperty {
  _id: string;
  property_type: string;
  location: string;
  photos: string[];
  user_id: User;
  rera_number?: string;
  size?: string;
  price?: string | number;
  description?: string;
  amenities?: string[];
}

interface BookingDetails {
  _id: string;
  user_id: User;
  property_approved: ApprovedProperty;
  status?: string;
  booking_date?: string;
  created_at?: string;
  updated_at?: string;
}

interface StaticProperty {
  title: string;
  image: string;
  name: string;
  location: string;
  size: string;
  type: string;
  price: string;
  RERA: string;
  description: string;
  contact: {
    whatsapp: string;
  };
}

interface ApiResponse {
  booking: BookingDetails;
  message?: string;
}

const Page: React.FC = () => {
  const params = useParams<{ id: string }>();
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const id = params.id;
  const router = useRouter() 
 

  const [propertyDetails, setPropertyDetails] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoading2, setIsLoading2] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const BASEURL = process.env.NEXT_PUBLIC_API_URL

  const property: StaticProperty = {
    title: "Elegant 2BHK Apartment",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9b78825?auto=format&fit=crop&w=800&q=80",
    name: "Skyline Residency – Tower B, Flat 204",
    location: "Hinjewadi, Pune, Maharashtra",
    size: "980 sq.ft",
    type: "2BHK Apartment",
    price: "₹ 65,00,000",
    RERA: "8938973889",
    description:
      "This modern 2BHK apartment is located in the heart of Pune's IT hub. The property offers spacious rooms, premium fittings, 24/7 security, a dedicated parking slot, and excellent connectivity to schools, hospitals, and shopping centers.",
    contact: { whatsapp: "+91 9876543210" },
  };

  useEffect(() => {
    const fetchProperties = async (): Promise<void> => {
      try {
        const response = await axios.post<ApiResponse>(
          `${BASE_URL}/api/user/getBookingforApprovalbyID`,
          { id },
          { withCredentials: true ,  headers: {
            "Authorization": `Bearer ${getCookieValue()}`  // <-- Add your JWT token here
            }}
        );

        setPropertyDetails(response.data.booking);
        console.log("Fetched property:", response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error fetching property:", axiosError.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProperties();
    }
  }, [id, BASE_URL]);

  useEffect(() => {
    console.log(propertyDetails);
  }, [propertyDetails]);

  // Commented out approval function - can be uncommented if needed
  // const setBookingToApproval = async (): Promise<void> => {
  //   try {
  //     const response = await axios.post<{ message: string }>(
  //       `${BASE_URL}/api/user/setBookingtoApproval`,
  //       { id },
  //       { withCredentials: true }
  //     );

  //     alert(`Approved - ${response.data.message || response.data}`);
  //     router.push("/dashboard/admin");
  //   } catch (error) {
  //     const axiosError = error as AxiosError;
  //     console.error("Error approving booking:", axiosError.message);
  //     alert("Failed to approve booking. Please try again.");
  //   }
  // };


const openWhatsApp = (phone) => {
    // Ensure phone number has country code (e.g. India = +91)
    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
    const message = encodeURIComponent(
      `Hello ${propertyDetails?.user_id?.name}, I am contacting you regarding ${propertyDetails?.property_approved.property_name}.`
    );
    const url = `https://wa.me/${formattedPhone}?text=${message}`;
    window.open(url, "_blank");
  };


const handleContactLead = async () => {
  setIsLoading2(true);
  
  try {
    const response = await axios.post(`${BASEURL}/api/partner/setBookingtoContact`, {
      propertyId: propertyDetails?.id,
    },
     {
      withCredentials:true,
        headers: {
            "Authorization": `Bearer ${getCookieValue()}`  // <-- Add your JWT token here
            }
     });
    
     openWhatsApp(propertyDetails?.user_id.contact)
       router.push("/dashboard/partner/lead-received")   
       
       alert("Lead contacted successfully:")

    console.log('Lead contacted successfully:', response.data);
    // Handle success - update status or show success message
    // Close dialog on success
    setDialogOpen(false);
    // Optionally refresh data or update local state
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error contacting lead:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  } finally {
    setIsLoading2(false);
  }
};

const handleMarkAsPurchase = async () => {
  setIsLoading2(true);
  try {
    const response = await axios.post(`${BASEURL}/api/partner/setBookingtoPurchase`, {
      propertyId: propertyDetails?.id,
    },  { withCredentials: true ,  headers: {
            "Authorization": `Bearer ${getCookieValue()}`  // <-- Add your JWT token here
            }});

  
       
       alert("Lead contacted successfully:")
    
    console.log('Marked as purchase successfully:', response.data);
    // Handle success
    setDialogOpen(false);
    // Update UI or refresh data
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error marking as purchase:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  } finally {
    setIsLoading2(false);
  }
};




  return (
    <>
      <Nav />
      <div
        className={`${inter.className} min-h-screen bg-gradient-to-b from-[#D7E9FB] to-[#C8E2F8] flex flex-col items-center pt-16 pb-24`}
      >
     <PropertyDetailsPage propertyDetails={propertyDetails?.property_approved}/>

        {/* Action Buttons */}
        <div className="flex items-center fixed shadow rounded-2xl bottom-4 bg-white p-4 justify-center gap-3 w-11/12 max-w-md">
          <Button className="flex-1 bg-[#2396C6] hover:bg-[#0062cc] text-white py-5 text-base rounded-xl font-medium shadow">
            <Download /> Brochure
          </Button>

          {/* Contact Lead Dialog */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    <DialogTrigger asChild>
      {propertyDetails?.status === "approved" ? (
        <Button
          variant={"selectdashed"}
          className="flex-1 bg-[#2396C6] hover:bg-[#0062cc] text-white py-5 text-base rounded-xl font-medium shadow"
        >
          Contact the Lead
        </Button>
      ) : propertyDetails?.status === "contact" ? (
        <Button
          variant={"selectdashed"}
          className="flex-1 bg-[#2396C6] hover:bg-[#0062cc] text-white py-5 text-base rounded-xl font-medium shadow"
        >
          Mark as Purchase
        </Button>
      ) : propertyDetails?.status === "purchase" ? (
        <Button
          variant={"selectdashed"}
          className="flex-1 bg-green-500 text-white py-5 text-base rounded-xl font-medium shadow"
          disabled
        >
          Already Purchase
        </Button>
      ) : null}
    </DialogTrigger>
    
    <DialogContent className="sm:max-w-md bg-white rounded-xl">
      <div className={`${inter.className}`}>
        <h1 className="text-xl font-bold text-center">
          {propertyDetails?.status === "approved" ? "Contact Lead" : "Mark as Purchase"}
        </h1>
        <h1 className="p-2 text-center">
          {propertyDetails?.status === "approved" 
            ? <>Do you want to contact the lead from <strong>{propertyDetails?.user_id.name}</strong>?</>
            : "Do you want to mark this property as purchased?"
          }
        </h1>
        
        <div className="w-full flex items-center justify-center gap-10">
          {propertyDetails?.status === "approved" ? (
            <Button
              variant={"selectdashed"}
              onClick={handleContactLead}
              disabled={isLoading}
              className="w-[90%] mt-3 hover:bg-white hover:border-2 hover:text-gray-500"
            >
              {isLoading ? "Processing..." : "Contact the Lead"}
            </Button>
          ) : propertyDetails?.status === "contact" ? (
            <Button
              variant={"selectdashed"}
              onClick={handleMarkAsPurchase}
              disabled={isLoading}
              className="w-[90%] mt-3 hover:bg-white hover:border-2 hover:text-gray-500"
            >
              {isLoading ? "Processing..." : "Mark as Purchase"}
            </Button>
          ) : null}
        </div>
      </div>
    </DialogContent>
  </Dialog>
        </div>
      </div>
    </>
  );
};

export default Page;