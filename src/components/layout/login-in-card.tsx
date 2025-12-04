"use client"
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { Inter } from "next/font/google";
import GoogleIcon from "../../../public/icons/googleicon";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { loginUser } from "@/services/auth";
import { EyeOff, Eye } from "lucide-react";
import toast from "react-hot-toast";
import GoogleLogin from "../shared/google-login";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional CSS variable
});

// Define types for form data and errors
interface FormData {
  email: string;
  password: string;
   role?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
   
}

export default function LoginInForm() {
  const router = useRouter();
    const BASEURL = process.env.NEXT_PUBLIC_API_URL
    const [showPassword, setShowPassword] = useState(false);


  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    role:"partner"
  });

   const [loading, setloading] = useState<boolean>(false);

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple validation
  
    const newErrors: FormErrors = {};

    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);

    setloading(true);
    if (Object.keys(newErrors).length === 0) {
      try {
        // const res = await axios.post(
        //   `${BASEURL}/api/auth/login`,
        //   { email: formData.email, password: formData.password , role:formData.role },
        //   { withCredentials: true, 
        //      headers: {
        //     'Content-Type': 'application/json'
        //   } }
        // );


        const res = await loginUser({email: formData.email,
  password: formData.password,
  role: formData.role,})
     

  

  Cookies.set("client_token_partner",res.token, {
  expires: 1,        
  secure: true,     
  sameSite: "strict"
  });
  router.push("/dashboard/partner");
  toast.success(res.message || "Login successful!");
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          // AxiosError: may have response.data.error
          toast.error(err.response?.data?.error ?? err.message);
           setloading(false);
        } else if (err instanceof Error) {
       toast.error(err.message);
          setloading(false);
        } else {
         toast.error(String(err));
          setloading(false);
        }
      }
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md p-6 w-[95%] md:w-[30rem] bg-white rounded-lg shadow-md">
      <div className="h-20 w-60 m-auto flex items-center justify-center">
        <Image src="/image/Logo.png" alt="logo" width={140} height={100} className="scale-140" />
      </div>
    
      <div className={`${inter.className} flex items-center justify-center flex-col`}>
        <h2 className={`${inter.className} text-[#247FBA] text-2xl font-bold mb-6 text-center`}>Partner Log in</h2>
        <p className="-mt-6 text-xs font-bold text-center text-gray-400 mb-3">Login To an Account <br /> to Connect with your interested verified property</p>
      </div>
      <form onSubmit={handleSubmit} className={`${inter.className} space-y-4`}>
        {/* Email */}
        <div>
          <Label htmlFor="email" className="mb-2 text-[#247FBA]">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password */}
   <div className="relative">
  <Label htmlFor="password" className="mb-2 text-[#247FBA]">
    Password
  </Label>

  <div className="relative">
    <Input
      id="password"
      name="password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter password"
      value={formData.password}
      onChange={handleChange}
      className="pr-10"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#247FBA]"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>

  {errors.password && (
    <p className="text-red-500 text-sm">{errors.password}</p>
  )}
</div>

        <div className="w-full h-5 flex items-center justify-between">
          <div className="flex gap-2">
            <h1 className={`${inter.className} text-xs font-bold text-gray-400`}>
              Remember me
            </h1>
          </div>
          <Link href={"/auth/forgot-password"}>
          <h1 className={`${inter.className} text-xs font-bold text-[#247FBA]`}>
            Forgot Password?
          </h1>
          
          </Link>
        </div>

        {/* Submit Button */}
        <Button  type="submit" className="group w-full mt-4 bg-[#247FBA] hover:scale-105 hover:bg-white hover:border-2 hover:text-[#247FBA]">
          {loading ?
         <div className="flex items-center justify-center  ">
  <div className="animate-spin rounded-2xl  h-4 w-4 border-b-2 group-hover:border-[#247FBA] border-white"></div>
</div>
           :
          <h1>Login</h1>
          }
          
        </Button>
      </form>
      <hr className="mt-3" />
      <div className="w-full flex items-center justify-center">
       <GoogleLogin />
      </div>
      <p className="mt-5 text-xs font-bold text-center text-gray-400">Don &apos t have an Account, <Link href={"/auth/sign-in"}><span className="hover:underline"> Sign-up</span></Link></p>
    </div>
  );
}
