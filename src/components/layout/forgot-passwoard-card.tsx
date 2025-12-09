"use client"
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/navigation';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
}

export default function ForgotPasswordForm() {
  const router = useRouter();
  const BASEURL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors.email) {
      setErrors({});
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const res = await axios.post(
          `/api/auth/forgot-password/emailsent`,
          { email: formData.email },
         
        );

        setSuccess(true);
        alert(res.data.message || "Password reset link sent to your email!");
        
        // Optionally redirect to login after a delay
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
        
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          alert(err.response?.data?.error ?? err.message);
        } else if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md p-6 w-[95%] md:w-[30rem] bg-white rounded-lg shadow-md">
      <div className="h-20 w-60 m-auto flex items-center justify-center">
        <Image 
          src="/image/Logo.png" 
          alt="logo" 
          width={140} 
          height={100} 
          className="scale-140" 
        />
      </div>
    
      <div className={`${inter.className} flex items-center justify-center flex-col`}>
        <h2 className={`${inter.className} text-[#247FBA] text-2xl font-bold mb-6 text-center`}>
          Forgot Password?
        </h2>
        <p className="-mt-6 text-xs font-bold text-center text-gray-400 mb-3">
          Enter your email address and we&apos;ll send you <br /> 
          a link to reset your password
        </p>
      </div>

      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-green-700 text-sm text-center">
            ✓ Password reset link has been sent to your email. 
            Please check your inbox and spam folder.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={`${inter.className} space-y-4`}>
          {/* Email */}
          <div>
            <Label htmlFor="email" className="mb-2 text-[#247FBA]">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={loading}
            className="group w-full mt-4 bg-[#247FBA] hover:scale-105 hover:bg-white hover:border-2 hover:text-[#247FBA] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-2xl h-4 w-4 border-b-2 group-hover:border-[#247FBA] border-white"></div>
              </div>
            ) : (
              <h1>Send Reset Link</h1>
            )}
          </Button>
        </form>
      )}

      <hr className="mt-3" />
     
      <p className="mt-5 text-xs font-bold text-center text-gray-400">
        Remember your password? {" "}
        <Link href={"/auth/login"}>
          <span className="text-[#247FBA] hover:underline">Log in</span>
        </Link>
      </p>
      
      <p className="mt-2 text-xs font-bold text-center text-gray-400">
        Don&apos;t have an Account? {" "}
        <Link href={"/auth/sign-in"}>
          <span className="text-[#247FBA] hover:underline">Sign up</span>
        </Link>
      </p>
    </div>
  );
}