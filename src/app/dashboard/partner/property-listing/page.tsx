"use client";
import React from "react";

import {
  Button,
} from "@/components/ui/button";

import Nav from "@/components/layout/nav";
import {  ChevronRight , ArrowLeft, Home} from "lucide-react";
import Link from "next/link";
import PropertyForm from "@/components/layout/property-listing-form";
import inter from "@/lib/font/Inter";





export default function PropertyDetailsForm() {
 
  return (
    <>
    <Nav/>
    <div className={`${inter.className} max-w-2xl mx-auto bg-white dark:bg-slate-900  rounded-2xl shadow-md mt-5 space-y-6`}>
        <div className="flex items-center gap-2 px-5 pt-4 mb-12">
        <Link href="/dashboard/partner">
            <Button
              variant="ghost"
              size="icon"
              className="group rounded-full hover:bg-[#E2F1FF] hover:border-2 mt-10  "
            >

            <div className="flex items-center bg-pvr px-3 py-3 rounded-full  ">

                 <ArrowLeft  className="text-white tetx-xl scale-80 group-hover:text-blue-700"/>
              <Home className="text-white group-hover:text-blue-700" />
            </div>
              
            </Button>
          </Link>
      <h2 className="text-2xl font-semibold mt-10 ml-2 flex items-center   text-gray-500  ">
        <h1 >Property Listing </h1> <ChevronRight className="mt-1"/>
      </h2>
        </div>

          <PropertyForm/>

    </div>
    </>
  );
}
