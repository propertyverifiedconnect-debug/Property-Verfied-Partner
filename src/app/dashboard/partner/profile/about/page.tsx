"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import inter from '@/lib/font/Inter';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Nav from '@/components/layout/nav';
import { ArrowLeft, ArrowRight, CircleCheck, MoveLeft } from 'lucide-react';
import Link from 'next/link';

interface User {
    name?: string;
    contact?: string;
    email?: string;
    city?: string;
    role?: string;
}

const page: React.FC = () => {
    const router = useRouter();
    const BASEURL: string = process.env.NEXT_PUBLIC_API_URL ?? "";
    const [user, setUser] = useState<User | null>(null);

   

 

    const menuItems = [
       
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "About Property Verified",
            route: "/dashboard/partner/profile/about",
            description: "Learn more about us"
        },
       
    ];

    return (
        <>
     <Nav setActive={"profile"}/>
        
        <div className={`${inter.className} min-h-screen w-full px-4 mt-5 md:mt-10 bg-[#CDE4F9] justify-center  pb-20 flex flex-col items-center md:px-4`}>
         <div className='w-96 '>
             
             <Link href={"/dashboard/partner"}>
                <div className='h-10 w-10 ml-3 flex items-center justify-center text-pvr  rounded-2xl  bg-white mt-10'>
                    <ArrowLeft size={19}/>
                </div>
             
             </Link>
         </div>
            {/* Header with Profile Info */}
                <div  className='flex flex-col items-center justify-center'>

            <div className="w-94 md:w-[25rem] mt-6 space-y-4">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                     
                        className="w-full bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 hover:shadow-xl transition-all duration-300 active:scale-95"
                    >
                        <div className="h-12 w-12 rounded-full bg-[#CDE4F9] flex items-center justify-center text-gray-700">
                            {item.icon}
                        </div>
                        <div className="flex-1 text-left">
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-pvr whitespace-nowrap">{item.title} <CircleCheck size={19}/></h3>
                            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"   strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                ))}
            </div>

            {/* about  Details Card */}
            <div className="w-92 md:w-[25rem] mt-6 bg-white rounded-2xl shadow-md p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-4"> About </h2>
                <div className="space-y-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Property Verified is your trusted platform for comprehensive property verification and documentation services. 
                        We help buyers, sellers, and investors make informed decisions by providing accurate property records, 
                        legal verification, and detailed history reports.
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Our mission is to bring transparency to property transactions and ensure that every property deal 
                        is backed by verified information and legal compliance.
                    </p>
                    <div className="pt-3 border-t border-gray-200">
                        <h3 className="text-md font-semibold text-gray-800 mb-2">Contact Us</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>📧 Email: upport@propertyverify.com</p>
                            <p>📞 Phone: +91 1234567890</p>
                            <p>🏢 Address: Pune, Maharashtra, India</p>
                        </div>
                    </div>
                </div>
            </div>
                </div>
            {/* Menu Items */}
            {/* Logout Button with Confirmation Dialog */}
        
        </div>
        </>
    );
};

export default page;