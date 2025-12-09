"use client"
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { getCookieValue } from "@/function/cookie";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface FormData {
  contact: string;
  city: string;
  excutiveType: string;
  rera: string;
   CompanyName:string 
}

interface FormErrors {
  contact?: string;
  city?: string;
  excutiveType?: string;
  rera?: string;
  CompanyName:string
  idProof?: string;
}

// Indian cities list
export const INDIAN_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Pimpri-Chinchwad",
  "Patna",
  "Vadodara",
  "Ghaziabad",
  "Ludhiana",
  "Agra",
  "Nashik",
  "Faridabad",
  "Meerut",
  "Rajkot",
  "Kalyan-Dombivali",
  "Vasai-Virar",
  "Varanasi",
  "Srinagar",
  "Aurangabad",
  "Dhanbad",
  "Amritsar",
  "Navi Mumbai",
  "Allahabad",
  "Ranchi",
  "Howrah",
  "Coimbatore",
  "Jabalpur",
  "Gwalior",
  "Vijayawada",
  "Jodhpur",
  "Madurai",
  "Raipur",
  "Kota",
].sort();

const Excutive: [string, string, string] = [
  "Company Owner",
  "Company Excutive",
  "Freelancer",
];

export default function ContactCard() {
  const router = useRouter();
  const BASEURL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState<FormData>({
    contact: "",
    city: "",
    excutiveType: "",
    rera: "",
    CompanyName:""
  });

  const [idProof, setIdProof] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      city: value,
    }));
    if (errors.city) {
      setErrors((prev) => ({ ...prev, city: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    // Validation
    if (!formData.contact) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact must be 10 digits";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.excutiveType) {
      newErrors.excutiveType = "Executive type is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const loadingToast = toast.loading("Updating details...");
      setLoading(true);

      try {
        // Get user data from localStorage
        const storedData = localStorage.getItem("partnerdata");
        if (!storedData) {
          toast.dismiss(loadingToast);
          toast.error("User data not found");
          setLoading(false);
          return;
        }

        const userData = JSON.parse(storedData);

        // Create FormData for multipart/form-data
        const form = new FormData();
        form.append("contact", formData.contact);
        form.append("city", formData.city);
        form.append("excutiveType", formData.excutiveType);
        form.append("rera", formData.rera);
        form.append("CompanyName", formData.CompanyName);

        if (idProof) {
          form.append("idProof", idProof);
        }

        // Update user profile
        const res = await axios.post(
          `/api/auth/setContact`,
          form
        );

        toast.dismiss(loadingToast);

        // Update localStorage with new data
        const updatedUser = { 
          ...userData, 
          contact: formData.contact, 
          city: formData.city,
          excutiveType: formData.excutiveType,
          rera: formData.rera,
          CompanyName:formData.CompanyName

        };
        localStorage.setItem("partnerdata", JSON.stringify(updatedUser));

        toast.success("Details updated successfully!");
        
        // Refresh the page or redirect
        window.location.reload();

      } catch (err: unknown) {
        toast.dismiss(loadingToast);
        
        if (axios.isAxiosError(err)) {
          const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message;
          toast.error(errorMsg);
        } else if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error("Failed to update details");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md p-6 w-[95%] md:w-[30rem] bg-white rounded-lg shadow-md">
      <div className={`${inter.className} flex items-center justify-center flex-col`}>
        <h2 className={`${inter.className} text-[#247FBA] text-2xl font-bold mb-6 text-center`}>
          Complete Your Profile
        </h2>
        <p className="-mt-6 text-xs font-bold text-center text-gray-400 mb-3">
          Please provide your contact details <br /> to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`${inter.className} space-y-4`}>
        {/* Contact Number */}
        <div>
          <Label htmlFor="contact" className="mb-2 text-[#247FBA]">
            Contact Number
          </Label>
          <Input
            id="contact"
            name="contact"
            type="tel"
            placeholder="Enter your 10-digit contact number"
            value={formData.contact}
            onChange={handleChange}
            maxLength={10}
            className="w-full"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
          )}
        </div>

        <div>
          <Label htmlFor="contact" className="mb-2 text-[#247FBA]">
            Company Name
          </Label>
          <Input
            id="CompanyName"
            name="CompanyName"
            type="text"
            placeholder="Ennter Company Name"
            value={formData.CompanyName}
            onChange={handleChange}
  
            className="w-full"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
          )}
        </div>

        {/* City Select */}
        <div>
          <Label htmlFor="city" className="mb-2 text-[#247FBA]">
            City
          </Label>
          <Select onValueChange={handleCityChange} value={formData.city}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {INDIAN_CITIES.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        {/* Executive Type */}
        <div>
          <Label htmlFor="excutiveType" className="mb-2 text-[#247FBA]">
            Type of Executive
          </Label>
          <Select
            onValueChange={(value: string) =>
              setFormData((prev) => ({ ...prev, excutiveType: value }))
            }
            value={formData.excutiveType}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select executive type" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {Excutive.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.excutiveType && (
            <p className="text-red-500 text-sm mt-1">{errors.excutiveType}</p>
          )}
        </div>
        
        {/* ID Proof Upload */}
        <div>
          <Label className="mb-2 text-[#247FBA]">Upload ID Proof</Label>
          <Input
            id="idProof"
            name="idProof"
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setIdProof(e.target.files?.[0] || null)}
          />
        </div>

        {/* RERA Number */}
        <div>
          <Label htmlFor="rera" className="mb-2 text-[#247FBA]">
            Rera Number (Optional)
          </Label>
          <Input
            id="rera"
            name="rera"
            type="text"
            placeholder="Enter Rera Number"
            value={formData.rera}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="group w-full mt-4 bg-[#247FBA] hover:scale-105 hover:bg-white hover:border-2 hover:text-[#247FBA]"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-2xl h-4 w-4 border-b-2 group-hover:border-[#247FBA] border-white"></div>
            </div>
          ) : (
            <h1>Save Details</h1>
          )}
        </Button>
      </form>

      <p className="mt-5 text-xs font-bold text-center text-gray-400">
        This information is required to access your dashboard
      </p>
    </div>
  );
}