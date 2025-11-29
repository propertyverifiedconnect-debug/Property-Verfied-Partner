"use client";
import React from 'react';
import { useState } from "react";
import {
  ArrowLeft,
  Phone,
  Clock,
  Download,
  CircleCheck,
  Car,
  Shield,
  MapPin,
  Link2,
  Home,
  Bed,
  
  Waves,
  PawPrint,
  Store,

  Wifi,
  Bath,
  Maximize,
  Calendar,
  Users,
  Building,
  IndianRupee,
  Heart,
  Share2,
  Wind,
  Check,
  ChevronRightIcon,
  ChevronRight,
  DoorOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

function PropertyDetailsPage({ propertyDetails, isLoading  , type , propertybooking }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price) => {
    if (!price) return "N/A";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleWhatsApp = () => {
    if (propertyDetails?.contact) {
      window.open(`https://wa.me/91${propertyDetails.contact}`, '_blank');
    }
  };
 const amenityIcons = {
  parking: Car,
  security: Shield,
  pool: Waves,
  'pet-friendly': PawPrint,
  store: Store,
  location: MapPin,
  wifi: Wifi,
};

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: propertyDetails?.property_name,
        text: `Check out this ${propertyDetails?.property_type} in ${propertyDetails?.location}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div
      className={`${inter.className} min-h-screen bg-gradient-to-b from-[#D7E9FB] to-[#C8E2F8] flex flex-col items-center pt-16 pb-32`}
    >
      {/* Header */}
      <div className="w-11/12 max-w-md flex items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          
          
           {
            type == "lead" ? 
            <>
            <Link href="/dashboard/partner/lead-received/">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-[#E2F1FF] p-3 bg-white"
            >
              <ArrowLeft className="text-[#007BFF]" />
            </Button>
          </Link>
            <h1 className="font-bold text-2xl text-gray-700">Lead Recived</h1>
            </>
            :
            <>
            <Link href="/dashboard/partner/partner-listed-property/">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-[#E2F1FF] p-3 bg-white"
            >
              <ArrowLeft className="text-[#007BFF]" />
            </Button>
          </Link>
            <h1 className="font-bold text-2xl text-gray-700">Property Details</h1>
            </>
           }
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFavorited(!isFavorited)}
            className="rounded-full hover:bg-[#E2F1FF] bg-white"
          >
            <Heart
              className={`${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              size={20}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="rounded-full hover:bg-[#E2F1FF] bg-white"
          >
            <Share2 className="text-gray-600" size={20} />
          </Button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-11/12 max-w-md mb-4">
        <div className="relative">
          {propertyDetails && !isLoading ? (
            <div className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <img
                src={propertyDetails.photos?.[0]}
                alt={propertyDetails.property_name}
                onLoad={() => setImageLoaded(true)}
                className="w-full h-80 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-md">
                <span className="text-[#007BFF] font-bold text-sm">
                  {propertyDetails.looking_for}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur text-xs px-3 py-1.5 rounded-full shadow-md font-semibold flex items-center gap-1.5">
                <CircleCheck size={16} className="text-green-600" />
                <span className="text-gray-700">Verified Listing</span>
              </div>
            </div>
          ) : (
            <Skeleton className="h-80 bg-pvr opacity-20 w-full rounded-2xl" />
          )}
        </div>
      </div>

      {/* Property Title & Price */}
      <Card className="bg-white w-11/12 max-w-md rounded-2xl shadow-lg border-none mb-3">
        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h1 className="font-bold text-gray-800 text-2xl mb-1">
                {propertyDetails?.property_name || "Property Name"}
              </h1>
              <p className="text-gray-600 flex items-center gap-1 text-sm">
                <MapPin size={16} className="text-[#007BFF]" />
                {propertyDetails?.location}, {propertyDetails?.city}
              </p>
            </div>
            <Badge className="bg-pvr text-white px-3 py-1 text-xs">
              {propertyDetails?.property_kind}
            </Badge>
          </div>
          
          <div className="bg-gradient-to-r  text-zinc-900  rounded-xl mt-3">
            <div className="flex items-baseline gap-1">
           
              <span className="text-3xl font-bold">
                {formatPrice(propertyDetails?.price)}
              </span>
              <span className="text-sm opacity-90 ml-1">
                {propertyDetails?.looking_for === "Rent / Lease" ? "/month" : ""}
              </span>
            </div>
          </div>

{
  type == "lead" ?
   <div className="bg-gradient-to-r w-full  text-zinc-900  rounded-xl mt-3">
              <h1 className='flex items-center'><strong>Booking By</strong>  <ChevronRight size={19}/>   <h1 className='font-normal'>
                {propertybooking?.user_id.name}
                </h1> </h1>
            
            <div className="bg-amber-50 rounded-lg py-2 mt-2 px-2 mb-3">
            <p className="text-xl text-amber-900 mb-2 font-bold flex items-center  ">Scheduled Visit <ChevronRight size={19}/></p>
            <div className="flex flex-col items-start gap-3 text-xs text-amber-700">
              {propertybooking?.visit_date && (
                <span className="flex items-center text-lg gap-1">
                  <Calendar size={24} />
                  {formatDate(propertybooking?.visit_date)}
                </span>
              )}
              {propertybooking?.visit_time && (
                <span className="flex items-center text-lg  gap-1">
                  <Clock size={20} />
                  {propertybooking?.visit_time}
                </span>
              )}
                {propertybooking?.visit_time && (
                <span className="flex items-center  text-lg  gap-1">
                 <h1 className=' capitalize flex gap-2'><DoorOpen/> {propertybooking?.visit_type} visit</h1>
            
                
                </span>
              )}
            </div>
          </div>

          </div>
  
  :
             <div className="bg-gradient-to-r w-full  text-zinc-900  rounded-xl mt-3">
              <h1 className='flex items-center'><strong>Description</strong> <ChevronRightIcon className='mt-0.5' size={17}/></h1>
            <div className="flex items-center  gap-1">
               <h1 className='font-normal'>
                {propertyDetails?.description}
                </h1>
            </div>
          </div>

}

            

          
        </CardContent>
      </Card>

      {/* Quick Facts */}
      <Card className="bg-white w-11/12 max-w-md rounded-2xl shadow-lg border-none mb-3">
        <CardContent className="p-5">
          <h3 className="font-medium  text-pvr text-lg mb-4 flex items-center gap-2">
            <Home size={20} />
            Property Overview
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-[#F0F8FF] p-3 rounded-xl">
              <div className="bg-pvr p-2 rounded-lg">
                <Building size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Type</p>
                <p className="font-semibold text-sm text-gray-800">
                  {propertyDetails?.property_type}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#F0F8FF] p-3 rounded-xl">
              <div className="bg-pvr p-2 rounded-lg">
                <Bed size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Bedrooms</p>
                <p className="font-semibold text-sm text-gray-800">
                  {propertyDetails?.bedroom || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#F0F8FF] p-3 rounded-xl">
              <div className="bg-pvr p-2 rounded-lg">
                <Bath size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Bathrooms</p>
                <p className="font-semibold text-sm text-gray-800">
                  {propertyDetails?.bathroom || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#F0F8FF] p-3 rounded-xl">
              <div className="bg-pvr p-2 rounded-lg">
                <Maximize size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Area</p>
                <p className="font-semibold text-sm text-gray-800">
                  {propertyDetails?.area} {propertyDetails?.area_unit}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 mt-4">
            <div className="flex items-center justify-between bg-[#F0F8FF] p-3 rounded-xl">
              <span className="text-sm text-gray-700 flex items-center gap-2">
                <Calendar size={18} className="text-[#007BFF]" />
                Available From
              </span>
              <span className="font-semibold text-sm text-gray-800">
                {formatDate(propertyDetails?.available)}
              </span>
            </div>

            <div className="flex items-center justify-between bg-[#F0F8FF] p-3 rounded-xl">
              <span className="text-sm text-gray-700 flex items-center gap-2">
                <Home size={18} className="text-[#007BFF]" />
                Floor
              </span>
              <span className="font-semibold text-sm text-gray-800">
                {propertyDetails?.floor}
              </span>
            </div>

            <div className="flex items-center justify-between bg-[#F0F8FF] p-3 rounded-xl">
              <span className="text-sm text-gray-700 flex items-center gap-2">
                <Building size={18} className="text-[#007BFF]" />
                Property Age
              </span>
              <span className="font-semibold text-sm text-gray-800">
                {propertyDetails?.age_property}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Details */}
   <Card className="bg-white w-11/12 max-w-md rounded-lg shadow-sm border border-gray-200 mb-3">
  <CardContent className="p-6">
    <h3 className="font-semibold flex items-center gap-2 text-pvr text-lg mb-5 pb-3 border-b border-gray-100">
    <Building/>  {propertyDetails?.looking_for == 'Sell' ? "Selling" : "Rental"} Details
    </h3>

    <div className="space-y-4 border-gray-200 ">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">Available For</span>
        <span className="text-sm text-gray-900 font-medium">{propertyDetails?.available_for}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">Suitable For</span>
        <span className="text-sm text-gray-900 font-medium">{propertyDetails?.suitable_for}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">Room Type</span>
        <span className="text-sm text-gray-900 font-medium">{propertyDetails?.roomtype}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">Capacity</span>
        <span className="text-sm text-gray-900 font-medium">
          {propertyDetails?.capacity} persons
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 font-medium">Lifestyle</span>
        <span className="text-sm text-gray-900 font-medium flex items-center gap-1.5">
          <Wind size={14} className="text-gray-500" />
          {propertyDetails?.Lifestyle}
        </span>
      </div>
    </div>
  </CardContent>
</Card>

      {/* Features & Amenities */}
      <Card className="bg-white w-11/12 max-w-md rounded-2xl shadow-lg border-none mb-3">
        <CardContent className="p-5">
          <h3 className="font-bold text-pvr text-base mb-4 flex items-center gap-2">
            <Check size={20} />
            Features & Amenities
          </h3>
          
          <div className="flex flex-wrap gap-3">
        {
  propertyDetails?.Options?.map((val, inx) => {
    // Get the icon component based on the string value
    const IconComponent = amenityIcons[val.toLowerCase()] || MapPin; // MapPin as fallback
    
    return (
      <div key={inx} className="flex items-center gap-2 text-[#E9F4FF] bg-[#2396C6] px-3 py-2 rounded-lg">
        <IconComponent size={16} />
        <span className="text-sm font-medium">{val}</span>
      </div>
    );
  })
}
            {/* <div className="flex items-center gap-2 bg-[#E9F4FF] text-[#007BFF] px-3 py-2 rounded-lg">
              <Shield size={16} />
              <span className="text-sm font-medium">Security</span>
            </div>
            <div className="flex items-center gap-2 bg-[#E9F4FF] text-[#007BFF] px-3 py-2 rounded-lg">
              <MapPin size={16} />
              <span className="text-sm font-medium">Prime Location</span>
            </div> */}
            <div className="flex items-center gap-2 bg-[#E9F4FF] text-[#007BFF] px-3 py-2 rounded-lg">
              <Home size={16} />
              <span className="text-sm font-medium">{propertyDetails?.balconies} Balcony</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
   

      {/* Social Media Links */}
      {propertyDetails?.social_media && (
        <Card className="bg-white w-11/12 max-w-md rounded-2xl shadow-lg border-none mb-3">
          <CardContent className="p-5">
            <h3 className="font-bold text-[#007BFF] text-base mb-3 flex items-center gap-2">
              <Link2 size={20} />
              Property Links
            </h3>
            <a
              href={propertyDetails.social_media}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#F0F8FF] p-3 rounded-xl hover:bg-[#E9F4FF] transition-colors"
            >
              <Badge className="bg-pvr">Google</Badge>
              <span className="text-sm text-gray-700 truncate flex-1">
                View on Google
              </span>
            </a>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      {
        type !== "lead" &&

      <div className="flex items-center fixed shadow-xl rounded-2xl bottom-4 bg-white p-4 justify-center gap-3 w-11/12 max-w-md z-50">
        <Button className="flex-1 bg-[#2396C6] hover:bg-[#1a7399] text-white py-6 text-base rounded-xl font-medium shadow-md">
          <Download className="mr-2" size={20} />
          Brochure
        </Button>

      </div>
      }
    </div>
  );
}

export default PropertyDetailsPage;