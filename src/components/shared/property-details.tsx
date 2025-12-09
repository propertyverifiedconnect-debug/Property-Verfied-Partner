"use client";
import React from "react";
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
  Grid2X2,
  House,
  Minimize,
  Ruler,
  Layout,
  Grid,
  Square,
  Book,
  CheckCircle,
  Star,
  BrickWall,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Inter } from "next/font/google";
import SliderImage from "./sliderImage";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

function PropertyDetailsPage({
  propertyDetails,
  isLoading,
  type,
  propertybooking,
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price) => {
    if (!price)
      return <Skeleton className="h-8 bg-[#D5E8FA] w-[60%] rounded-xl" />;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleWhatsApp = () => {
    if (propertyDetails?.contact) {
      window.open(`https://wa.me/91${propertyDetails.contact}`, "_blank");
    }
  };
  const amenityIcons = {
    parking: Car,
    security: Shield,
    pool: Waves,
    "pet allowed": PawPrint,
    mart: Store,
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
          {type == "lead" ? (
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
          ) : (
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
              <h1 className="font-bold text-2xl text-gray-700">
                Property Details
              </h1>
            </>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFavorited(!isFavorited)}
            className="rounded-full hover:bg-[#E2F1FF] bg-white"
          >
            <Heart
              className={`${
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
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
            <div
              className={`transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            >
              <SliderImage
                Image={propertyDetails.photos}
                setImageLoaded={setImageLoaded}
              />
              <div className="absolute top-3 z-99 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-md">
                <span className="text-[#007BFF] font-bold text-sm">
                  {propertyDetails.looking_for}
                </span>
              </div>
              <div className="absolute bottom-3 z-99 left-3 bg-white/95 backdrop-blur text-xs px-3 py-1.5 rounded-full shadow-md font-semibold flex items-center gap-1.5">
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
                {propertyDetails?.property_name || (
                  <Skeleton className="h-8 bg-[#D5E8FA] w-full rounded-xl" />
                )}
              </h1>
              {propertyDetails?.location && propertyDetails?.city ? (
                <p className="text-gray-600 flex items-center gap-1 text-sm">
                  <MapPin size={16} className="text-[#007BFF]" />
                  {propertyDetails?.location}, {propertyDetails?.city}
                </p>
              ) : (
                <Skeleton className="h-8 bg-[#D5E8FA] w-[80%] rounded-xl" />
              )}
            </div>
            {propertyDetails?.property_kind && (
              <Badge className="bg-pvr text-white px-3 py-1 text-xs">
                {propertyDetails?.property_kind}
              </Badge>
            )}
          </div>

          <div className="bg-gradient-to-r text-zinc-900 rounded-xl mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">
                {formatPrice(propertyDetails?.price) || (
                  <Skeleton className="h-8 bg-[#D5E8FA] w-[60%] rounded-xl" />
                )}
              </span>
              <span className="text-sm opacity-90 ml-1">
                {propertyDetails?.looking_for === "Rent / Lease"
                  ? "/month"
                  : ""}
              </span>
            </div>

            {/* Additional pricing details - compact version */}
            <div className="mt-2 flex flex-wrap gap-2">
              {propertyDetails?.allInclusive && (
                <span className="px-2 capitalize py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                  All inclusive
                </span>
              )}

              {propertyDetails?.priceNegotiable && (
                <span className="px-2 capitalize py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                  Price negotiable
                </span>
              )}

              {propertyDetails?.taxExcluded && (
                <span className="px-2 py-1  capitalize text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                  Tax & gov charges excluded
                </span>
              )}
            </div>
          </div>

          {type == "lead" ? (
            <div className="bg-gradient-to-r w-full  text-zinc-900  rounded-xl mt-3">
              <h1 className="flex items-center">
                <strong>Booking By</strong> <ChevronRight size={19} />{" "}
                <h1 className="font-normal">{propertybooking?.user_id.name}</h1>{" "}
              </h1>

              <div className="bg-amber-50 rounded-lg py-2 mt-2 px-2 mb-3">
                <p className="text-xl text-amber-900 mb-2 font-bold flex items-center  ">
                  Scheduled Visit <ChevronRight size={19} />
                </p>
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
                      <h1 className=" capitalize flex gap-2">
                        <DoorOpen /> {propertybooking?.visit_type} visit
                      </h1>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r w-full  text-zinc-900  rounded-xl mt-3">
              <h1 className="flex items-center">
                <strong>Description</strong>{" "}
                <ChevronRightIcon className="mt-0.5" size={17} />
              </h1>
              <div className="flex items-center  gap-1">
                <h1 className="font-normal">
                  {propertyDetails?.description || (
                    <Skeleton className="h-20 bg-[#D5E8FA] w-[60%] rounded-xl" />
                  )}
                </h1>
              </div>
            </div>
          )}
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
                {propertyDetails?.property_type ==
                "Independent House / Villa" ? (
                  <House size={20} className="text-white" />
                ) : propertyDetails?.property_type == "Plot / Land" ? (
                  <Grid2X2 size={20} className="text-white" />
                ) : (
                  <Building size={20} className="text-white" />
                )}
              </div>
              <div>
                <p className="text-xs text-gray-600">Type</p>
                <p className="font-semibold text-xs text-gray-800">
                  {propertyDetails?.property_type == "Independent House / Villa"
                    ? "House / Villa"
                    : propertyDetails?.property_type}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#F0F8FF] p-3 rounded-xl">
              <div className="bg-pvr p-2 rounded-lg">
                {propertyDetails?.property_type ==
                "Independent House / Villa" ? (
                  <Bed size={20} className="text-white" />
                ) : propertyDetails?.property_type == "Plot / Land" ? (
                  <BrickWall size={20} className="text-white" />
                ) : (
                  <Bed size={20} className="text-white" />
                )}
              </div>
              <div>
                  <p className="text-xs text-gray-600">{ propertyDetails?.bedroom ? "Bedroom" : "Has Boundary" }</p>
                <p className="font-semibold text-sm text-gray-800">
                  {propertyDetails?.bedroom || propertyDetails?.Boundary}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#F0F8FF] p-3 rounded-xl">
              <div className="bg-pvr p-2 rounded-lg">
                 {propertyDetails?.property_type ==
                "Independent House / Villa" ? (
                  <Bath size={20} className="text-white" />
                ) : propertyDetails?.property_type == "Plot / Land" ? (
                  <Square size={20} className="text-white" />
                ) : (
                  <Bath size={20} className="text-white" />
                )}
              </div>
              <div>
                <p className="text-xs text-gray-600">{ propertyDetails?.bathroom ? "Bathrooms" : "Open Side" }</p>
                <p className="font-semibold text-sm text-gray-800">
                  {propertyDetails?.bathroom || propertyDetails?.openSide }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#F0F8FF] p-3 rounded-xl">
              <div className="bg-pvr p-2 rounded-lg">
                {propertyDetails?.property_type ==
                "Independent House / Villa" ? (
                  <Minimize size={20} className="text-white" />
                ) : propertyDetails?.property_type == "Plot / Land" ? (
                  <Truck size={20} className="text-white" />
                ) : (
                  <Minimize size={20} className="text-white" />
                )}
              </div>
              <div>
                 <p className="text-xs text-gray-600">{ propertyDetails?.Apartmentsize ? "Size" : propertyDetails?.construction ? "Under Construction" :"Area" }</p>
                <p className="font-semibold text-sm text-gray-800">
                  {/* {propertyDetails?.area} {propertyDetails?.area_unit} */}
                  {propertyDetails?.Apartmentsize || propertyDetails?.construction || `${propertyDetails?.area } ${propertyDetails?.area_unit}  ` }
                </p>
              </div>
            </div>
          </div>

     <div className="h-auto flex gap-2 flex-col w-full mt-2 p-3">
  <h3 className="font-semibold flex items-center gap-2 text-pvr text-lg pb-3 border-b border-gray-100">
    <Ruler /> Area Details
  </h3>

  {/* For Apartment/Building - Show Carpet Area */}
  {propertyDetails?.property_type !== "Plot / Land" && propertyDetails?.CarpetArea && (
    <div className="flex items-center justify-between bg-white p-3 rounded-xl">
      <span className="text-sm text-gray-700 flex items-center gap-2">
        <Square size={18} className="text-[#007BFF]" />
        Carpet Area
      </span>
      <span className="font-semibold text-sm text-gray-800">
        {propertyDetails.CarpetArea} {propertyDetails.CarpetAreaUnit}
      </span>
    </div>
  )}

  {/* For Apartment/Building - Show Buildup Area */}
  {propertyDetails?.property_type !== "Plot / Land" && propertyDetails?.BuildupArea && (
    <div className="flex items-center justify-between bg-white p-3 rounded-xl">
      <span className="text-sm text-gray-700 flex items-center gap-2">
        <Layout size={18} className="text-[#007BFF]" />
        Buildup Area
      </span>
      <span className="font-semibold text-sm text-gray-800">
        {propertyDetails.BuildupArea} {propertyDetails.BuildupAreaUnit}
      </span>
    </div>
  )}

  {/* For Apartment/Building - Show Super Buildup Area */}
  {propertyDetails?.property_type !== "Plot / Land" && propertyDetails?.SuperBuildupArea && (
    <div className="flex items-center justify-between bg-white p-3 rounded-xl">
      <span className="text-sm text-gray-700 flex items-center gap-2">
        <Grid size={18} className="text-[#007BFF]" />
        Super Buildup Area
      </span>
      <span className="font-semibold text-sm text-gray-800">
        {propertyDetails.SuperBuildupArea} {propertyDetails.SuperBuildupAreaUnit}
      </span>
    </div>
  )}

  {/* For Plot/Land - Show Length */}
  {propertyDetails?.property_type === "Plot / Land" && propertyDetails?.lengthPlot && (
    <div className="flex items-center justify-between bg-white p-3 rounded-xl">
      <span className="text-sm text-gray-700 flex items-center gap-2">
        <Square size={18} className="text-[#007BFF]" />
        Length of the Plot
      </span>
      <span className="font-semibold text-sm text-gray-800">
        {propertyDetails.lengthPlot} Feet
      </span>
    </div>
  )}

  {/* For Plot/Land - Show Breadth */}
  {propertyDetails?.property_type === "Plot / Land" && propertyDetails?.breathPlot && (
    <div className="flex items-center justify-between bg-white p-3 rounded-xl">
      <span className="text-sm text-gray-700 flex items-center gap-2">
        <Layout size={18} className="text-[#007BFF]" />
        Breadth of the Plot
      </span>
      <span className="font-semibold text-sm text-gray-800">
        {propertyDetails.breathPlot} Feet
      </span>
    </div>
  )}
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
            {propertyDetails?.floor && (
              <div className="flex items-center justify-between bg-[#F0F8FF] p-3 rounded-xl">
                <span className="text-sm text-gray-700 flex items-center gap-2">
                  <Home size={18} className="text-[#007BFF]" />
                  Floor
                </span>
                <span className="font-semibold text-sm text-gray-800">
                  {propertyDetails?.floor}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between bg-[#F0F8FF] p-3 rounded-xl">
              <span className="text-sm text-gray-700 flex items-center gap-2">
                <Home size={18} className="text-[#007BFF]" />
                Ownership
              </span>
              <span className="font-semibold text-sm text-gray-800">
                {propertyDetails?.Ownership || "N/A"}
              </span>
            </div>

            {
propertyDetails?.AvailabilityStatus &&
            <div className="flex items-center justify-between bg-[#F0F8FF] p-3 rounded-xl">
              <span className="text-sm text-gray-700 flex items-center gap-2">
                <Home size={18} className="text-[#007BFF]" />
                Availability Status
              </span>
              <span className="font-semibold text-sm text-gray-800">
                {propertyDetails?.AvailabilityStatus}
              </span>
            </div>

            }

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

      <Card className="bg-white w-11/12 max-w-md rounded-xl shadow-md border border-gray-100 mb-3 overflow-hidden">
        <CardContent className="p-0">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-[#247FBA] to-[#2396C6] p-4">
            <h3 className="font-semibold flex items-center gap-2 text-white text-lg">
              <Book className="w-5 h-5" />
              Legal Details
            </h3>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Verified Badge */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-sm text-gray-700 font-medium flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" />
                Property Verified & Certified
              </span>
              <div className="px-3 py-1 whitespace-nowrap  bg-green-600 text-white text-xs font-semibold rounded-full">
                ✓ Verified
              </div>
            </div>

            {/* Sanction Details */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-500 font-medium">
                  Sanction Type
                </span>
                <span className="text-sm text-gray-900 font-semibold bg-gray-50 px-3 py-1 rounded-md">
                  {propertyDetails?.sanctionType || "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 font-medium">
                  {propertyDetails?.sanctionType} No.
                </span>
                <span className="text-sm text-[#247FBA] font-mono font-semibold">
                  {propertyDetails?.sanctionNo || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Details */}
    <Card className="bg-white w-11/12 max-w-md rounded-lg shadow-sm border border-gray-200 mb-3">
  <CardContent className="p-6">
    <h3 className="font-semibold flex items-center gap-2 text-pvr text-lg mb-5 pb-3 border-b border-gray-100">
      <Building />{" "}
      {propertyDetails?.looking_for == "Sell" ? "Selling" : "Rental"}{" "}
      Details
    </h3>

    <div className="space-y-4 border-gray-200">
      {propertyDetails?.available_for && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">
            Available For
          </span>
          <span className="text-sm text-gray-900 font-medium">
            {propertyDetails.available_for}
          </span>
        </div>
      )}

      {propertyDetails?.suitable_for && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">
            Suitable For
          </span>
          <span className="text-sm text-gray-900 font-medium">
            {propertyDetails.suitable_for}
          </span>
        </div>
      )}

      {propertyDetails?.roomtype && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">
            Room Type
          </span>
          <span className="text-sm text-gray-900 font-medium">
            {propertyDetails.roomtype}
          </span>
        </div>
      )}

      {propertyDetails?.capacity && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">
            Capacity
          </span>
          <span className="text-sm text-gray-900 font-medium">
            {propertyDetails.capacity} persons
          </span>
        </div>
      )}

      {propertyDetails?.Lifestyle && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">
            Lifestyle
          </span>
          <span className="text-sm text-gray-900 font-medium flex items-center gap-1.5">
            <Wind size={14} className="text-gray-500" />
            {propertyDetails.Lifestyle}
          </span>
        </div>
      )}

      {/* Fallback if no details available */}
      {!propertyDetails?.available_for && 
       !propertyDetails?.suitable_for && 
       !propertyDetails?.roomtype && 
       !propertyDetails?.capacity && 
       !propertyDetails?.Lifestyle && (
        <p className="text-sm text-gray-500 text-center py-4">
          No details available
        </p>
      )}
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
            {propertyDetails?.Options?.map((val, inx) => {
              // Get the icon component based on the string value
              const IconComponent = amenityIcons[val.toLowerCase()] || Star; // MapPin as fallback

              return (
                <div
                  key={inx}
                  className="flex items-center gap-2 text-[#E9F4FF] bg-[#2396C6] px-3 py-2 rounded-lg"
                >
                  <IconComponent size={16} />
                  <span className="text-sm font-medium">{val}</span>
                </div>
              );
            })}
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
              <span className="text-sm font-medium">
                {propertyDetails?.balconies} Balcony
              </span>
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
      {type !== "lead" && (
        <div className="flex items-center fixed shadow-xl rounded-2xl bottom-4 bg-white p-4 justify-center gap-3 w-11/12 max-w-md z-50">
          <a href={propertyDetails?.brochure || "#"} className="w-full">
            <Button
              className={`flex-1 w-full  ${
                propertyDetails?.brochure ? "bg-[#2396C6]" : "bg-zinc-500"
              } text-white py-6 text-base rounded-xl font-medium shadow-md`}
            >
              <Download className="mr-2" size={20} />
              {propertyDetails?.brochure ? "Brochure" : "No Brochure"}
            </Button>
          </a>
        </div>
      )}
    </div>
  );
}

export default PropertyDetailsPage;
