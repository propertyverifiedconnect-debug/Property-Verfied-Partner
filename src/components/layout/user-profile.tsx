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
import Cookies from 'js-cookie'; 
import toast from 'react-hot-toast';

interface User {
    name?: string;
    contact?: string;
    email?: string;
    city?: string;
    role?: string;
}

const UserProfile: React.FC = () => {
    const router = useRouter();
    const BASEURL: string = process.env.NEXT_PUBLIC_API_URL ?? "";
    const [user, setUser] = useState<User | null>(null);

    const logout = async (): Promise<void> => {
        try {
            // await fetch(`${BASEURL}/api/auth/logout`, {
            //     method: "POST",
            //     credentials: "include",
            // });
            Cookies.remove("client_token_partner", { path: "/" });
            localStorage.clear();
            router.push("/auth/login");
            toast.success("Logout successful")
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("partnerdata");
        if (storedUser) {
            const parsed = JSON.parse(storedUser) as User;
            setUser(parsed);
        }
    }, []);

    const menuItems = [
        // {
        //     icon: (
        //         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        //         </svg>
        //     ),
        //     title: "Profile",
        //     route: "/profile",
        //     description: "View and edit your profile"
        // },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "About",
        route: "/dashboard/partner/profile/about",
            description: "Learn more about us"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: "Terms & Conditions",
            route: "/dashboard/partner/profile/terms",
            description: "Read our terms and policies"
        }
    ];

    return (
        <div className={`${inter.className} min-h-screen w-full bg-[#CDE4F9] justify-center  pb-20 flex flex-col items-center pb-8`}>
            {/* Header with Profile Info */}
            <div className="w-93 md:w-[26rem]  rounded-b-3xl  pb-8 pt-12">
                <div className="flex flex-col items-center">
                    {/* Profile Picture */}
                    <div className="relative">
                        <div className="h-24 w-24 rounded-full  border-4 border-white  overflow-hidden">
                            <img 
                                className="h-full w-full object-cover" 
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU0a0iDtUPUzs0GFM6DSuovK0uOE4-Sc40Pg&s" 
                                alt="Profile" 
                            />
                        </div>
                    </div>
                    
                    {/* User Info */}
                    <h1 className="text-2xl font-bold text-zinc-700 mt-2">{user?.name || "Guest User"}</h1>
                    <p className="text-sm text-zinc-700 mt-1 capitalize">{user?.role || "User"}</p>
                </div>
            </div>

            {/* Menu Items */}
            <div className="w-80 md:w-[25rem]  space-y-4">
                {menuItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => router.push(item.route)}
                        className="w-full bg-white rounded-2xl shadow-md p-5 flex items-center gap-4 hover:shadow-xl transition-all duration-300 active:scale-95"
                    >
                        <div className="h-12 w-12 rounded-full bg-[#CDE4F9] flex items-center justify-center text-gray-700">
                            {item.icon}
                        </div>
                        <div className="flex-1 text-left">
                            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                ))}
            </div>

            {/* User Details Card */}
            <div className="w-80 md:w-[25rem] mt-6 bg-white rounded-2xl shadow-md p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <p className="text-sm text-gray-700">{user?.contact || "Not provided"}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-700">{user?.email || "Not provided"}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm text-gray-700">{user?.city || "Not provided"}</p>
                    </div>
                </div>
            </div>

            {/* Logout Button with Confirmation Dialog */}
            <Dialog>
                <DialogTrigger asChild>
                    <button
                        className="w-80 mt-6 bg-red-500 text-white font-semibold py-2 rounded-2xl shadow-md hover:bg-red-600 active:scale-95 transition-all duration-300"
                    >
                        Log Out
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirm Logout</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to log out? You will be redirected to the login page.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 sm:gap-0">
                  
                        <Button type="button" variant="destructive" onClick={logout}>
                            Log Out
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserProfile;