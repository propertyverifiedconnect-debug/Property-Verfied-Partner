"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Car,
  Shield,
  Waves,
  PawPrint,
  Store,
  MapPin,
  Wifi,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Textarea } from "../ui/textarea";
import { Upload } from "lucide-react";
import { getCookieValue } from "@/function/cookie";
import MiddlewareLoader from "../shared/middleware-loader";
import toast from "react-hot-toast";
import { useUnauthorize } from "@/function/unthorize";
import { INDIAN_CITIES } from "./Contactcard";

interface FormDataType {
  lookingFor: string;
  propertyKind: string;
  propertyType: string;
  propertyName: string;
  bedroom: string | number;
  bathroom: string | number;
  balconies: string | number;
  roomtype: string;
  contact: string;
  Area: string;
  Areaunit: string;
  floor: string;
  ageproperty: string;
  available: string;
  availablefor: string;
  suitablefor: string;
  socialMedia: string;
  description: string;
  photos: FileList | null; // ✅ FIXED
  location: string;
  price: string;
  capacity: string;
  CarpetArea: string;
  BuildupArea: string;
  SuperBuildupArea: string;
  CarpetAreaUnit: string;
  BuildupAreaUnit: string;
  SuperBuildupAreaUnit: string;
  alreadyrent: string;
  profession: string;
  Lifestyle: string;
  Apartmentsize: string;
  AvailabilityStatus: string;
  allInclusive?: boolean;
  priceNegotiable?: boolean;
  taxExcluded?: boolean;
  Ownership: string;
  lengthPlot: string;
  breathPlot: string;
  Boundary: string;
  openSide: string;
  construction: string;
  brochure: string;
  Options: string[];
  city?: string;
}

export default function PropertyForm() {
  const [step, setStep] = useState(1);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [Amenities, SetAmenties] = useState("");
  const unauthorize = useUnauthorize();
  const [showCustomInput, setShowCustomInput] = useState(false);

  const BASEURL = process.env.NEXT_PUBLIC_API_URL;
  const amenityComponents = [
    <Car key={1} size={20} />,
    <Shield key={2} size={20} />,
    <Waves key={3} size={20} />,
    <PawPrint key={4} size={20} />,
    <Store key={5} size={20} />,
    <MapPin key={6} size={20} />,
    <Wifi key={7} size={20} />,
  ];

  const [formData, setFormData] = useState<FormDataType>({
    lookingFor: "",
    propertyKind: "",
    propertyType: "",
    propertyName: "",
    bedroom: "",
    bathroom: "",
    balconies: "",
    roomtype: "",
    contact: "",
    Area: "",
    Areaunit: "",
    floor: "",
    ageproperty: "",
    available: "",
    availablefor: "",
    suitablefor: "",
    socialMedia: "",
    description: "",
    photos: null,
    capacity: "",
    alreadyrent: "",
    profession: "",
    Lifestyle: "",
    Apartmentsize: "",
    Options: [],
    CarpetAreaUnit: "",
    BuildupAreaUnit: "",
    SuperBuildupAreaUnit: "",
    CarpetArea: "",
    BuildupArea: "",
    SuperBuildupArea: "",
    Ownership: "",
    allInclusive: false,
    priceNegotiable: false,
    taxExcluded: false,
    AvailabilityStatus: "",
    brochure: "",
    lengthPlot: "",
    breathPlot: "",
    Boundary: "",
    openSide: "",
    construction: "",
    location: "",
    price: "",
  });

  const validateStep = (currentStep: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!formData.lookingFor)
        newErrors.lookingFor = "Please select what you're looking for";
      if (!formData.propertyKind)
        newErrors.propertyKind = "Please select property kind";
      if (!formData.propertyType)
        newErrors.propertyType = "Please select property type";
      if (!formData.contact) {
        newErrors.contact = "Contact is required";
      } else if (
        !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.contact) &&
        !/^[0-9]{10}$/.test(formData.contact)
      ) {
        newErrors.contact = "Enter valid email or 10-digit phone number";
      }
    }

    if (currentStep === 2) {
      if (!formData.propertyName)
        newErrors.propertyName = "Property name is required";
      if (!formData.location) newErrors.location = "Location is required";
      if (!formData.city) newErrors.city = "City is required";

      if (formData.propertyType !== "Plot / Land") {
        if (!formData.bedroom) newErrors.bedroom = "Select number of bedrooms";
        if (!formData.bathroom)
          newErrors.bathroom = "Select number of bathrooms";
        if (!formData.roomtype) newErrors.roomtype = "Select room type";
      }

      if (!formData.capacity)
        newErrors.capacity = "Property capacity is required";
      // if (!formData.Area) newErrors.Area = "Area is required";
      // if (!formData.Areaunit) newErrors.Areaunit = "Area unit is required";

    
      if (formData.propertyType === "Apartment" && !formData.CarpetArea) {
        newErrors.CarpetArea = "Carpet Area required";
      }

        if (formData.propertyType === "Apartment" && !formData.BuildupArea) {
        newErrors.BuildupArea = "Buildup Area is required";
      }
        if (formData.propertyType === "Apartment" && !formData.SuperBuildupArea) {
        newErrors.SuperBuildupArea = "Super Buildup Area is required";
      }

         if (formData.propertyType !== "Plot / Land" && !formData.AvailabilityStatus) {
        newErrors.AvailabilityStatus = "Availability Status is required";
      }
      

       if(!formData.Ownership)
        {
          newErrors.Ownership= "Ownership is required";
        }  

 if (formData.propertyType === "Plot / Land")
 {
   if(!formData.lengthPlot)
         {
           newErrors.lengthPlot= "Length of Plot is required";
         }  
  
           if(!formData.breathPlot)
         {
           newErrors.breathPlot= "Breath of Plot is required";
         }  
  
         if(!formData.construction || !formData.openSide || !formData.Boundary)
         {
           newErrors.plot1= "Field is required";
         }  
           if( !formData.openSide )
         {
           newErrors.plot2= "Field is required";
         }  
           if( !formData.Boundary)
         {
           newErrors.plot3= "Field is required";
         }  

 }






      if (formData.propertyType !== "Plot / Land" && !formData.floor) {
        newErrors.floor = "Floor details are required";
      }
      if (formData.propertyType === "Apartment" && !formData.Apartmentsize) {
        newErrors.ApartmentSize = "Appartment required";
      }
      if (!formData.ageproperty)
        newErrors.ageproperty = "Age of property is required";
      if (!formData.available) {
        newErrors.available = "Available from date is required";
      } else if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(formData.available)) {
        newErrors.available = "Date must be in YYYY-MM-DD format";
      } else {
        // Optional: Check if it's a valid date
        const dateObj = new Date(formData.available);
        if (isNaN(dateObj.getTime())) {
          newErrors.available = "Please enter a valid date";
        }
      }
    

      }

    if (currentStep === 3) {
      if (!formData.photos || formData.photos.length === 0) {
        newErrors.photos = "Please upload at least one photo";
      } else if (formData.photos.length > 4) {
        newErrors.photos = "Maximum 4 photos allowed";
      }
      if (!formData.price) {
        newErrors.price = "Price is required";
      } else if (parseFloat(formData.price) <= 0) {
        newErrors.price = "Price must be greater than 0";
      }
      if (!formData.description) {
        newErrors.description = "Description is required";
      } else if (formData.description.length < 20) {
        newErrors.description = "Description must be at least 20 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    } else {
      // Show first error message
      const firstError = Object.values(errors)[0];
      toast.error(firstError || "Please fill all required fields");
    }
  };
  const handlePrev = () => setStep((prev) => prev - 1);
  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
    console.log(field, value, Amenities);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFormData({ ...formData, photos: files as FileList });

    // Generate previews separately
    if (files) {
      const previewUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previewUrls);
    }
  };

  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null;
    return <p className="text-red-500 text-xs mt-1">{error}</p>;
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      const firstError = Object.values(errors)[0];
      toast.error(
        firstError || "Please fill all required fields before submitting"
      );
      return;
    }

    setloading(true);
    setShowUploadModal(true);

    try {
      const fd = new FormData();

      // append fields (strings)
      for (const key of [
        "lookingFor",
        "propertyKind",
        "propertyType",
        "propertyName",
        "contact",
        "city",
        "location",
        "bedroom",
        "bathroom",
        "balconies",
        "roomtype",
        "Area",
        "Areaunit",
        "floor",
        "ageproperty",
        "available",
        "availablefor",
        "suitablefor",
        "capacity",
        "alreadyrent",
        "profession",
        "Lifestyle",
        "Apartmentsize",
        "CarpetAreaUnit",
        "BuildupAreaUnit",
        "SuperBuildupAreaUnit",
        "CarpetArea",
        "BuildupArea",
        "SuperBuildupArea",
        "Ownership",
        "AvailabilityStatus",
        "socialMedia",
        "allInclusive",
        "priceNegotiable",
        "taxExcluded",
        "brochure",
        "lengthPlot",
        "breathPlot",
        "Boundary",
        "openSide",
        "construction",
        "price",
        "description",
      ] as (keyof FormDataType)[]) {
        // 👈 Added assertion
        const value = formData[key];
        if (value !== undefined && value !== null) {
          fd.append(key, String(value)); // 👈 Convert to string to satisfy FormData
        }
      }

      formData.Options.forEach((option) => {
        fd.append("Options", option);
      });

      // append files (input name is 'photos' because server expects that)
      if (formData.photos && formData.photos.length) {
        for (let i = 0; i < formData.photos.length; i++) {
          fd.append("photos", formData.photos[i]); // same field name for each file
        }
      }

      console.log("Printing Form Data", fd);

      // Get token from wherever you store it (example)
      const token = localStorage.getItem("sb_access_token") || ""; // replace with your storage key

      // const response = await axios.post(
      //   `${BASEURL}/api/partner/insertPropertyinDB`,
      //   fd,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //       Authorization: `Bearer ${getCookieValue()}`,
      //     },

      //   }
      // );

      const response = await axios.post("/api/partnerPost/setpropertylist", fd);

      setShowUploadModal(false);

      toast.success("✅ Form Submitted Successfully!");
      router.push("/dashboard/partner");

      console.log("Response:", response.data);
    } catch (error) {
      setShowUploadModal(false);
      if (error?.response?.status === 401) {
        unauthorize();
        toast.error("User unauthorized! Please login again.");
      }
      if (axios.isAxiosError(error)) {
        console.error(
          "❌ Error submitting form:",
          error.response ?? error.message
        );
      } else {
        console.error("❌ Unknown error:", error);
      }
      alert("Something went wrong while submitting the form.");
      alert("Something went wrong while submitting the form.");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center  px-2 ">
      <Card className="w-full max-w-lg shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-800">
            Step {step} of 3
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ x: 10, opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <Label className="text-md font-medium">
                  You’re looking to?
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Sell", "Rent / Lease", "Paying Guest", "Resell"].map(
                    (option) => (
                      <Button
                        key={option}
                        variant={
                          formData.lookingFor === option
                            ? "selectdashed"
                            : "select"
                        }
                        onClick={() => handleChange("lookingFor", option)}
                        size={"sm"}
                      >
                        {option}
                      </Button>
                    )
                  )}
                  <ErrorMessage error={errors.lookingFor} />
                </div>
              </div>

              <div>
                <Label className="text-md font-medium">
                  What kind of property?
                </Label>
                <div className="flex gap-2 mt-2">
                  {["Residential", "Commercial"].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.propertyKind === option
                          ? "selectdashed"
                          : "select"
                      }
                      size={"sm"}
                      onClick={() => handleChange("propertyKind", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                <ErrorMessage error={errors.propertyKind} />
              </div>

              <div>
                <Label className="text-md font-medium">
                  Select Property Type
                </Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    "Apartment",
                    "Independent House / Villa",
                    "Plot / Land",
                    "Farmhouse",
                    "Other",
                  ].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.propertyType === option
                          ? "selectdashed"
                          : "select"
                      }
                      size={"sm"}
                      onClick={() => handleChange("propertyType", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                <ErrorMessage error={errors.propertyType} />
              </div>

              <div>
                <Label className="text-md font-medium">Your Contact</Label>
                <p
                  className={`${
                    formData.contact.length <= 10
                      ? "text-green-800"
                      : "text-red-500"
                  } text-xs mt-2`}
                >
                  Phone number Digit {formData.contact.length}
                </p>
                <Input
                  type="number"
                  placeholder="Enter your phone or email"
                  value={formData.contact}
                  onChange={(e) => handleChange("contact", e.target.value)}
                  className="mt-2"
                />

                <ErrorMessage error={errors.contact} />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ x: 10, opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <Label className="text-md font-medium">Property Name</Label>
                <Input
                  placeholder="Enter Property Name"
                  value={formData.propertyName}
                  onChange={(e) => handleChange("propertyName", e.target.value)}
                  className="mt-2"
                />
                <ErrorMessage error={errors.propertyName} />
              </div>
              <div>
                <Label className="text-md font-medium">Property Location</Label>
                <Input
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="mt-2"
                />
                <ErrorMessage error={errors.location} />
              </div>

              <div>
                <Label className="text-md font-medium ">City</Label>
                <Select
                  onValueChange={(value) => handleChange("city", value)}
                  value={formData.city}
                >
                  <SelectTrigger className="mt-2 w-full">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
               <SelectContent className="max-h-[200px]">
                               {INDIAN_CITIES.map((city) => (
                                 <SelectItem key={city} value={city}>
                                   {city}
                                 </SelectItem>
                               ))}
                             </SelectContent>
                </Select>
                <ErrorMessage error={errors.city} />
              </div>

              {formData.propertyType !== "Plot / Land" && (
                <div>
                  <Label className="text-md font-medium mb-2 ">
                    Add Room Details{" "}
                  </Label>
                  <Label className="text-sm font-medium text-gray-600  ">
                    No of Bedrooms{" "}
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-1 mb-3">
                    {[1, 2, 3, 4, "Other"].map((option) => (
                      <Button
                        key={option}
                        variant={
                          formData.bedroom === option
                            ? "selectdashed"
                            : "select"
                        }
                        size={"sm"}
                        onClick={() => handleChange("bedroom", option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  <Label className="text-sm font-medium text-gray-600 ">
                    No of Bathrooms{" "}
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-1 mb-2">
                    {[1, 2, 3, 4, "Other"].map((option) => (
                      <Button
                        key={option}
                        variant={
                          formData.bathroom === option
                            ? "selectdashed"
                            : "select"
                        }
                        size={"sm"}
                        onClick={() => handleChange("bathroom", option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  <Label className="text-sm font-medium text-gray-600 ">
                    {" "}
                    Balconies{" "}
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[1, 2, 3, 4, "Other"].map((option) => (
                      <Button
                        key={option}
                        variant={
                          formData.balconies === option
                            ? "selectdashed"
                            : "select"
                        }
                        size={"sm"}
                        onClick={() => handleChange("balconies", option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  <ErrorMessage error={errors.bedroom} />
                  <ErrorMessage error={errors.bathroom} />
                </div>
              )}

              <div>
                {formData.propertyType == "Apartment" && (
                  <div>
                    <Label className="text-md font-medium mt-3 ">
                      Apartment Size{" "}
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {[
                        "Studio",
                        "1 bhk",
                        "2 bhk",
                        "3 bhk",
                        "4 bhk",
                        "6 bhk",
                        "Other",
                      ].map((option) => (
                        <Button
                          key={option}
                          variant={
                            formData.Apartmentsize === option
                              ? "selectdashed"
                              : "select"
                          }
                          size={"sm"}
                          onClick={() => handleChange("Apartmentsize", option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    <ErrorMessage error={errors.ApartmentSize} />
                  </div>
                )}
                {formData.propertyType == "Apartment" && (
                  <>

                    <Label className="text-md font-medium mt-3 ">
                      Add Apartment Area Details{" "}
                    </Label>
                    <Label className="text-sm font-medium text-gray-600  ">
                      Carpet Area{" "}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Carpet Area"
                        type="number"
                        value={formData.CarpetArea}
                        onChange={(e) =>
                          handleChange("CarpetArea", e.target.value)
                        }
                        className="mt-2 w-40"
                      />
                   

                      <Select
                        onValueChange={(value) =>
                          handleChange("CarpetAreaUnit", value)
                        }
                        value={formData.CarpetAreaUnit}
                      >
                        <SelectTrigger className="mt-2 w-40">
                          <SelectValue placeholder=" Area Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sqft">sq.ft</SelectItem>
                          <SelectItem value="sqyards">sq.yards</SelectItem>
                          <SelectItem value="sqm">sq.m</SelectItem>
                          <SelectItem value="acres">acres</SelectItem>
                          <SelectItem value="marla">marla</SelectItem>
                          <SelectItem value="cents">cents</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                         <ErrorMessage error={errors.CarpetArea}/>
                    <Label className="text-sm font-medium text-gray-600 mt-2  ">
                      Buildup Area{" "}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Buildup Area"
                        value={formData.BuildupArea}
                        onChange={(e) =>
                          handleChange("BuildupArea", e.target.value)
                        }
                        className="mt-2 w-40"
                      />

                      <Select
                        onValueChange={(value) =>
                          handleChange("BuildupAreaUnit", value)
                        }
                        value={formData.BuildupAreaUnit}
                      >
                        <SelectTrigger className="mt-2 w-40">
                          <SelectValue placeholder="Area Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sqft">sq.ft</SelectItem>
                          <SelectItem value="sqyards">sq.yards</SelectItem>
                          <SelectItem value="sqm">sq.m</SelectItem>
                          <SelectItem value="acres">acres</SelectItem>
                          <SelectItem value="marla">marla</SelectItem>
                          <SelectItem value="cents">cents</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  <ErrorMessage error={errors.BuildupArea}/>
                    <Label className="text-sm  mt-2 font-medium text-gray-600  ">
                      Super Buildup Area{" "}
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Super Buildup Area"
                        value={formData.SuperBuildupArea}
                        onChange={(e) =>
                          handleChange("SuperBuildupArea", e.target.value)
                        }
                        type="number"
                        className="mt-2 w-40"
                      />

                      <Select
                        onValueChange={(value) =>
                          handleChange("SuperBuildupAreaUnit", value)
                        }
                        value={formData.SuperBuildupAreaUnit}
                      >
                        <SelectTrigger className="mt-2 w-40">
                          <SelectValue placeholder=" Area Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sqft">sq.ft</SelectItem>
                          <SelectItem value="sqyards">sq.yards</SelectItem>
                          <SelectItem value="sqm">sq.m</SelectItem>
                          <SelectItem value="acres">acres</SelectItem>
                          <SelectItem value="marla">marla</SelectItem>
                          <SelectItem value="cents">cents</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                      <ErrorMessage error={errors.SuperBuildupArea}/>
                  </>
                )}

                {formData.propertyType !== "Plot / Land" && (

                  
                  <div>
                    <Label className="text-md font-medium mt-4  ">
                      Availability Status
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleChange("AvailabilityStatus", value)
                      }
                      value={formData.AvailabilityStatus}
                    >
                      <SelectTrigger className="mt-2 w-50">
                        <SelectValue placeholder="Select Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ready to move ">
                          Ready to move{" "}
                        </SelectItem>
                        <SelectItem value="Under construction ">
                          Under construction{" "}
                        </SelectItem>
                        <SelectItem value="Comming Soon">
                          Comming Soon
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {/* <ErrorMessage error={errors.city} /> */}
                     <ErrorMessage error={errors.AvailabilityStatus}/>
                  </div>
                )}

                {formData.propertyType === "Plot / Land" && (
                  <>
                      <Label className="text-md font-medium mt-3 ">
                  {" "}
                Property dimensions  ( In Feet).{" "}
                </Label>
                    <div>
                <Label className="text-sm font-medium mt-3 ">
                  {" "}
                 Length of Plot ( In Feet).{" "}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Length of Plot "
                    value={formData.lengthPlot}
                    onChange={(e) => handleChange("lengthPlot", e.target.value)}
                    className="mt-2 w-50"
                  />
                </div>
                   <ErrorMessage error={errors.lengthPlot}/>
              </div>
                <div>
                <Label className="text-sm font-medium mt-3 ">
                  {" "}
                 Breath of Plot ( In Feet ){" "}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Breath of Plot"
                    value={formData.breathPlot}
                    onChange={(e) => handleChange("breathPlot", e.target.value)}
                    className="mt-2 w-50"
                  />
                </div>
                    <ErrorMessage error={errors.breathPlot}/>

              </div>
                  <div>
                    <Label className="text-md font-medium mt-3 ">
                      Is there boundary wall around the property?
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {["Yes", "No"].map((option) => (
                        <Button
                          key={option}
                          variant={
                            formData.Boundary === option
                              ? "selectdashed"
                              : "select"
                          }
                          size={"sm"}
                          onClick={() => handleChange("Boundary", option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                      <ErrorMessage error={errors.plot1}/>
                  </div>

                    <div>
                    <Label className="text-md font-medium mt-3 ">
                      Any construction done on this property?
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {["Yes" , "No"].map((option) => (
                        <Button
                          key={option}
                          variant={
                            formData.construction === option
                              ? "selectdashed"
                              : "select"
                          }
                          size={"sm"}
                          onClick={() => handleChange("construction", option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    <ErrorMessage error={errors.plot2}/>
                  </div>
                      <div>
                    <Label className="text-md font-medium mt-3 ">
                        No. Of open sides
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {["1","2","3","3+"].map((option) => (
                        <Button
                          key={option}
                          variant={
                            formData.openSide === option
                              ? "selectdashed"
                              : "select"
                          }
                          size={"sm"}
                          onClick={() => handleChange("openSide", option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    <ErrorMessage error={errors.plot3}/>
                  </div>
                  </>
                )}

                <Label className="text-md font-medium mt-3 ">Ownership </Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {[
                    "Freehold",
                    "Leasehold",
                    "Co.operative society",
                    "Power of attorney ",
                  ].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.Ownership === option
                          ? "selectdashed"
                          : "select"
                      }
                      size={"sm"}
                      onClick={() => handleChange("Ownership", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                   <ErrorMessage error={errors.Ownership}/>

                {formData.propertyType !== "Plot / Land" && (
                  <>
                    <Label className="text-md font-medium mt-3 ">
                      Room Type (Optional){" "}
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {["Shared", "Private"].map((option) => (
                        <Button
                          key={option}
                          variant={
                            formData.roomtype === option
                              ? "selectdashed"
                              : "select"
                          }
                          size={"sm"}
                          onClick={() => handleChange("roomtype", option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div></div>
              <div>
                <Label className="text-md font-medium mt-3 ">
                  {" "}
                  Property Capacity (Optional){" "}
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Property Capacity"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                    className="mt-2 w-40"
                  />
                </div>
              </div>

              {formData.lookingFor == "Rent / Lease" && (
                <div>
                  <Label className="text-md font-medium mt-3 ">
                    No. Already Rented{" "}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="No. Tetants"
                      value={formData.alreadyrent}
                      onChange={(e) =>
                        handleChange("alreadyrent", e.target.value)
                      }
                      className="mt-2 w-40"
                    />
                  </div>
                </div>
              )}

              {formData.lookingFor == "Rent / Lease" &&
                formData.alreadyrent !== "0" &&
                formData.alreadyrent !== "" && (
                  <div>
                    <Label className="text-md font-medium mt-3 ">
                      Profession of the Tetants{" "}
                    </Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {[
                        "IT Professional",
                        "Govt employee",
                        "Student",
                        "Business",

                        "Doctor",
                        "Other",
                      ].map((option) => (
                        <Button
                          key={option}
                          variant={
                            formData.profession === option
                              ? "selectdashed"
                              : "select"
                          }
                          size={"sm"}
                          onClick={() => handleChange("profession", option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              <div>
                <div>
                  <Label className="text-md font-medium">
                    Select Amenities (Optional)
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "Parking",
                      "Security",
                      "Pool",
                      "Pet allowed",
                      "Mart",
                      "Prime Location",
                      "Wifi",
                      "Other+",
                    ].map((option, inx) => (
                      <Button
                        key={option}
                        variant={
                          option === "Other+"
                            ? showCustomInput
                              ? "selectdashed"
                              : "select"
                            : formData.Options.includes(option)
                            ? "selectdashed"
                            : "select"
                        }
                        size={"sm"}
                        onClick={() => {
                          if (option === "Other+") {
                            // Toggle custom input visibility without adding "Other" to array
                            setShowCustomInput(!showCustomInput);
                            return;
                          }
                          const exists = formData.Options.includes(option);
                          const updated = exists
                            ? formData.Options.filter((o) => o !== option)
                            : [...formData.Options, option];
                          handleChange("Options", updated);
                        }}
                      >
                        {amenityComponents[inx]}
                        {option}
                      </Button>
                    ))}

                    {/* Display custom amenities */}
                    {formData.Options.filter(
                      (opt) =>
                        ![
                          "Parking",
                          "Security",
                          "Pool",
                          "Pet allowed",
                          "Mart",
                          "Prime Location",
                          "Wifi",
                          "Other+",
                        ].includes(opt)
                    ).map((customOption) => (
                      <Button
                        key={customOption}
                        variant="selectdashed"
                        size={"sm"}
                        onClick={() => {
                          const updated = formData.Options.filter(
                            (o) => o !== customOption
                          );
                          handleChange("Options", updated);
                        }}
                      >
                        {customOption}
                      </Button>
                    ))}
                  </div>

                  {/* Show custom amenities input only when showCustomInput is true */}
                  {showCustomInput && (
                    <div>
                      <Label className="text-md font-medium mt-3">
                        Custom Amenities
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Add Amenities"
                          value={Amenities}
                          onChange={(e) => SetAmenties(e.target.value)}
                          className="mt-2 w-40"
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && Amenities.trim()) {
                              const updated = [
                                ...formData.Options,
                                Amenities.trim(),
                              ];
                              handleChange("Options", updated);
                              SetAmenties("");
                            }
                          }}
                        />
                        <Button
                          className="mt-2"
                          variant={"select"}
                          onClick={() => {
                            if (Amenities.trim()) {
                              const updated = [
                                ...formData.Options,
                                Amenities.trim(),
                              ];
                              handleChange("Options", updated);
                              SetAmenties("");
                            }
                          }}
                        >
                          Add+
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {formData.propertyType !== "Plot / Land" && (
                <div>
                  <Label className="text-md font-medium mt-3 ">
                    Floor Detials{" "}
                  </Label>
                  <p className="text-xs text-gray-400">
                    Total no of floors and your floor details
                  </p>
                  <Input
                    placeholder="Total Floor"
                    value={formData.floor}
                    onChange={(e) => handleChange("floor", e.target.value)}
                    className="mt-2 w-40"
                  />
                  <ErrorMessage error={errors.floor} />
                </div>
              )}

              <div>
                <Label className="text-md font-medium mt-3 ">
                  Age of Property{" "}
                </Label>

                <div className="flex flex-wrap gap-2 mt-1">
                  {["0-1 years", "1-5 years", "5-10 years", "10+ years"].map(
                    (option) => (
                      <Button
                        key={option}
                        variant={
                          formData.ageproperty === option
                            ? "selectdashed"
                            : "select"
                        }
                        size={"sm"}
                        onClick={() => handleChange("ageproperty", option)}
                      >
                        {option}
                      </Button>
                    )
                  )}
                </div>
                <ErrorMessage error={errors.ageproperty} />
              </div>

              <div>
                <Label className="text-md font-medium mt-3 ">
                  Available form{" "}
                </Label>
                <Input
                  placeholder="YYYY - MM -DD"
                  value={formData.available}
                  onChange={(e) => handleChange("available", e.target.value)}
                  className="mt-2 w-40"
                />
                <ErrorMessage error={errors.available} />
              </div>


{
  formData.propertyType !== "Plot / Land" &&
              <div>
                <Label className="text-md font-medium mt-3 ">
                  Available for (Optional){" "}
                </Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Girl", "Boys", "Any"].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.availablefor === option
                          ? "selectdashed"
                          : "select"
                      }
                      size={"sm"}
                      onClick={() => handleChange("availablefor", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                <ErrorMessage error={errors.availablefor} />
              </div>
}

              <div>
                <Label className="text-md font-medium mt-3 ">Lifestyle (Optional) </Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Quite", "Social"].map((option) => (
                    <Button
                      key={option}
                      variant={
                        formData.Lifestyle === option
                          ? "selectdashed"
                          : "select"
                      }
                      size={"sm"}
                      onClick={() => handleChange("Lifestyle", option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              { 
               formData.propertyType !== "Plot / Land"  &&

              <div>
                <Label className="text-md font-medium mt-3 ">
                  Suitable For (Optional){" "}
                </Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Student", "Working Professionals", "Both"].map(
                    (option) => (
                      <Button
                        key={option}
                        variant={
                          formData.suitablefor === option
                            ? "selectdashed"
                            : "select"
                        }
                        size={"sm"}
                        onClick={() => handleChange("suitablefor", option)}
                      >
                        {option}
                      </Button>
                    )
                  )}
                </div>
                <ErrorMessage error={errors.suitablefor} />
              </div>
              }
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ x: 10, opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <Label>Upload Property Photos</Label>
                <div className="relative">
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-2 "
                  />
                  <div className=" absolute  top-3  left-54">
                    <Upload />
                  </div>
                </div>
                {formData.photos && (
                  <p
                    className={`text-xs mt-1 ${
                      formData.photos.length > 4
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {formData.photos.length} file(s) selected{" "}
                    {formData.photos.length > 4 && "(Maximum 4 allowed)"}
                  </p>
                )}

                <ErrorMessage error={errors.photos} />
                {imagePreviews.length > 0 && (
                  <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                    <h3 className="text-sm font-medium mb-3">Preview</h3>

                    <div className="grid grid-cols-3 gap-3">
                      {imagePreviews.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt="preview"
                          className="w-32 h-32 object-cover rounded-md border"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label> Property Social Media Link (Optional)</Label>
                <Input
                  placeholder="https://instagram.com/yourproperty"
                  value={formData.socialMedia}
                  onChange={(e) => handleChange("socialMedia", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label> Property Brochure Link </Label>
                <Input
                  placeholder="https://google-drive.com/yourproperty"
                  value={formData.brochure}
                  onChange={(e) => handleChange("brochure", e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>
                  Property{" "}
                  {formData.lookingFor == "Sell"
                    ? "Selling "
                    : formData.lookingFor == "Rent / Lease"
                    ? "Rent"
                    : formData.lookingFor == "Resell"
                    ? "Reselling"
                    : "Paying Guest"}{" "}
                  Price (₹)
                </Label>
                <Input
                  type="number"
                  placeholder="Enter price in rupees"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className="mt-2  font-bold "
                />
                <ErrorMessage error={errors.price} />

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="allInclusive"
                      checked={formData.allInclusive || false}
                      onChange={(e) =>
                        handleChange("allInclusive", e.target.checked)
                      }
                      className="w-4 h-4 cursor-pointer"
                    />
                    <Label
                      htmlFor="allInclusive"
                      className="text-sm font-normal cursor-pointer"
                    >
                      All inclusive
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="priceNegotiable"
                      checked={formData.priceNegotiable || false}
                      onChange={(e) =>
                        handleChange("priceNegotiable", e.target.checked)
                      }
                      className="w-4 h-4 cursor-pointer"
                    />
                    <Label
                      htmlFor="priceNegotiable"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Price negotiable
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="taxExcluded"
                      checked={formData.taxExcluded || false}
                      onChange={(e) =>
                        handleChange("taxExcluded", e.target.checked)
                      }
                      className="w-4 h-4 cursor-pointer"
                    />
                    <Label
                      htmlFor="taxExcluded"
                      className="text-sm font-normal cursor-pointer"
                    >
                      Tax and gov. charges excluded
                    </Label>
                  </div>
                </div>
              </div>

              <div>
                <Label>Property Description</Label>
                <Textarea
                  placeholder="Describe your property, nearby facilities, and special features..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="mt-2 h-24"
                />
                <ErrorMessage error={errors.description} />
              </div>
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={handlePrev}>
              Back
            </Button>
          )}
          {step < 3 && (
            <Button onClick={handleNext} className="ml-auto">
              Next
            </Button>
          )}
          {step === 3 && (
            <Button onClick={handleSubmit} className="ml-auto w-60">
              {loading ? (
                <>
                  <div className="flex items-center justify-center  ">
                    <div className="animate-spin rounded-2xl  h-4 w-4 border-b-2 group-hover:border-[#247FBA] border-white"></div>
                  </div>
                  Please wait
                </>
              ) : (
                <h1>Submit</h1>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
      {showUploadModal && (
        <div className="fixed inset-0 bg-[#000000ae] opacity-109  flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex flex-col items-center space-y-4">
              <svg className="svg" viewBox="25 25 50 50">
                <circle className="circle" r="20" cy="50" cx="50"></circle>
              </svg>

              <h2 className="text-xl font-bold text-gray-800">
                Uploading Property...
              </h2>

              <p className="text-center text-gray-600">
                Please do not close or change this tab. Your property is being
                uploaded.
              </p>

              <p className="text-sm text-gray-500">
                This may take a few moments...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
