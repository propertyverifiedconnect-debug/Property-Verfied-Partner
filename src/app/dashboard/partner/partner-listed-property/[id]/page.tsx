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
          `${BASE_URL}/api/partner/getPropertiesbyID`,
          { id },
          { withCredentials: true ,  headers: {
            "Authorization": `Bearer ${getCookieValue()}`  // <-- Add your JWT token here
            }}
        );

        setPropertyDetails(response.data.properties);
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



  return (
    <>
      <Nav />
    <PropertyDetailsPage propertyDetails={propertyDetails}  isLoading={isLoading}/>
    </>
  );
};

export default Page;