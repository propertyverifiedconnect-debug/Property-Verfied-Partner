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
      <div
        className={`${inter.className} min-h-screen bg-gradient-to-b from-[#D7E9FB] to-[#C8E2F8] flex flex-col items-center pt-16 pb-24`}
      >
        {/* Header */}
        <div className="w-11/12 max-w-md flex items-center  justify-between mb-3">
          <div className="flex gap-2 items-center justify-center">
          <Link href="/dashboard/partner/partner-listed-property/">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-[#E2F1FF] p-3 bg-white"
            >
              <ArrowLeft className="text-[#007BFF]" />
            </Button>
          </Link>
          <h1 className="font-bold text-2xl text-gray-600">Listed Property</h1>

          </div>
        </div>

        {/* Image Section */}
        <div className="w-11/12 max-w-md mb-4">
          <div className="relative">
            {propertyDetails && !isLoading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <img
                  src={propertyDetails.photos?.[0]}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-md"
                />
              </motion.div>
            ) : (
              <Skeleton className="h-96 w-full" />
            )}
            <div className="absolute bottom-2 flex items-center justify-center gap-2 left-2 bg-white/90 text-xs px-2 py-1 rounded-full shadow-sm font-medium">
              Verified Listing <CircleCheck size={16} />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <Card className="bg-white w-11/12 max-w-md rounded-2xl shadow-lg border-none">
          <CardContent className="p-5 text-gray-800 text-sm">
            <h3 className="font-bold border-b border-gray-200 pb-2 mb-3 text-[#007BFF] text-base">
              Property Details
            </h3>

            <h1
              className={`${inter.className} font-bold text-gray-700 text-2xl flex items-center gap-1`}
            >
              {propertyDetails?.property_type || ""}
            </h1>
            <br />
            <p>
              <strong>Property Name</strong>
              <br /> {propertyDetails?.property_type}
            </p>
            <p>
              <strong>Location</strong> <br />
              {propertyDetails?.location}
            </p>
            <p>
              <strong>RERA Number</strong> <br /> {property.RERA}
            </p>
            <p>
              <strong>Size / Type / Price:</strong>
              <br />
              {property.size} | {property.type} | {property.price}
            </p>

            <p>
              <strong>Partner:</strong>
              <br />
              {propertyDetails?.user_id.name}
            </p>

            <p>
              <strong>Booking by:</strong>
              <br />
              {propertyDetails?.user_id.name}
            </p>

            {/* Highlights */}
            <div className="flex gap-2 flex-wrap mt-4">
              <span className="bg-[#E9F4FF] text-[#007BFF] flex items-center gap-2 px-2 py-1 text-xs rounded-full">
                <Car size={14} /> Parking
              </span>
              <span className="bg-[#E9F4FF] text-[#007BFF] flex items-center gap-2 px-2 py-1 text-xs rounded-full">
                <Shield size={14} /> Security
              </span>
              <span className="bg-[#E9F4FF] text-[#007BFF] flex items-center gap-2 px-2 py-1 text-xs rounded-full">
                <MapPin size={14} /> Prime Location
              </span>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="font-semibold mb-1 text-[#007BFF]">Description:</p>
              <p className="text-gray-700 leading-relaxed text-sm">
                {property.description}
              </p>
            </div>

            {/* Contact */}
            <div className="mt-4">
              <p className="font-semibold text-[#007BFF]">Contact</p> <br />
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2">
                <Phone size={18} /> WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis */}
        

        <Card className="bg-white w-11/12 max-w-md rounded-2xl mt-3 shadow-lg border-none">
          <CardContent className="p-5 text-gray-800 text-sm">
            <h3 className="font-bold border-b flex gap-2 border-gray-200 pb-2 mb-3 text-[#007BFF] text-base">
              <Link2 /> Social Media Links
            </h3>

            <div className="p-2 w-full flex flex-wrap gap-2">
              <Badge className="px-2 py-1">Video Link</Badge>
              <Badge className="px-2 py-1">Google</Badge>
              <Badge className="px-2 py-1">JustDial</Badge>
              <Badge className="px-2 py-1">Other</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center fixed shadow rounded-2xl bottom-4 bg-white p-4 justify-center gap-3 w-11/12 max-w-md">
          <Button className="flex-1 bg-[#2396C6] hover:bg-[#0062cc] text-white py-5 text-base rounded-xl font-medium shadow">
            <Download /> Brochure
          </Button>

          {/* Contact Lead Dialog */}
 
        </div>
      </div>
    </>
  );
};

export default Page;