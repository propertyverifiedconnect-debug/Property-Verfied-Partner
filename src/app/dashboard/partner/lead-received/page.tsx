"use client"

import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/button'
import inter from '@/lib/font/Inter'
import { ArrowLeft, Search, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import Nav from '@/components/layout/nav'
import { Skeleton } from '@/components/ui/skeleton'

import BookingCards from '@/components/shared/booking-card'
import { getCookieValue } from '@/function/cookie'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''


interface Property {
  id: string;
  approved_property_id: {
    photos: string;
    property_type: string;
    user_id: {
      name: string;
    };
    price: number;
  };
  user_id: {
    name: string;
  };
  config: string;
  status: 'approved' | 'contact' | 'purchase';
}


function Page() {

  const [properties, setProperties] = useState<Property[]>([]); 
  const [selected, setSelected] = useState('bookings');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  const tabs = [
    { id: 'bookings', label: 'Bookings', status: 'approved' },
    { id: 'contact', label: 'Contact', status: 'contact' },
    { id: 'purchase', label: 'Purchase', status: 'purchase' }
  ];

  useEffect(() => {
    const fetchProperties = async () => {
       setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/user/getApprovedBooking`,{   headers: {
                    "Authorization": `Bearer ${getCookieValue()}`  
                    }});
        setProperties(response.data.booking ?? response.data ?? []);
        console.log(response.data.booking )
        
      } catch (err) {
        console.error('Failed to fetch properties', err);
        setProperties([]);
      }finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Filter properties based on selected tab
  const filteredProperties = useMemo(() => {
    const currentTab = tabs.find(tab => tab.id === selected);
    const statusFilter = currentTab?.status;

    return properties.filter(property => {
      const matchesStatus = selected === 'bookings' 
        ? property.status === 'approved' 
        : property.status === statusFilter;

      const matchesSearch = searchQuery === '' || 
        property.approved_property_id?.property_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.user_id?.name?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [properties, selected, searchQuery]);

  return (
    <div>
       <Nav/>
      <div className='min-h-screen w-full overflow-hidden bg-[#CDE4F9] py-17 px-10 flex items-center justify-start flex-col'>
        <div className="flex items-center justify-center px-12 gap-1 md:gap-3 ">
          <Link href={"/dashboard/partner"}>
            <Button variant="outline" className="mb-2 rounded-full"><ArrowLeft/></Button>
          </Link>

          <div className="flex items-center bg-white rounded-full shadow px-3 w-11/12 max-w-md mb-3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by property name or Name"
              className="w-65 md:w-75 px-3 py-2 text-sm outline-none bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="py-2 px-5 md:-ml-20 flex items-start w-96">
          <h1 className={`${inter.className} font-bold text-gray-600 text-2xl flex items-center justify-center mb-2`}>
            Lead Received<ChevronRight/>
          </h1>
        </div>

        {/* Tab Selector with Slide Animation */}
        <div className={`${inter.className} flex items-center justify-center w-96 `}>
          <div className="inline-flex items-center justify-center gap-1 w-86  p-2 bg-gray-100 rounded-lg relative">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelected(tab.id)}
                className={`
                  px-6 py-2 text-sm font-medium rounded-md
                  transition-colors duration-200 ease-in-out
                  relative z-10
                  ${selected === tab.id 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {tab.label}
                {/* Sliding background animation */}
                {selected === tab.id && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-pvr rounded-md -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Container with Animations */}
        <div className='h-full w-96 mt-5 px-4'>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2"
            >
               {loading ? (
                // Loading state
                <div className='flex flex-col gap-1'>
                  <Skeleton className='h-30 w-full' />
                  <Skeleton className='h-30 w-full' />
                  <Skeleton className='h-30 w-full' />
                  <Skeleton className='h-30 w-full' />
                </div>
              ) : filteredProperties.length > 0 ? (
                // Filtered results
                filteredProperties.map((p, i) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <BookingCards property={p} type={"partner"} />
                  </motion.div>
                ))
              ) : (
                // No results
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-10 text-gray-500"
                >
                  No {tabs.find(t => t.id === selected)?.label.toLowerCase()} found
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div> 
    </div>
  )
}

export default Page