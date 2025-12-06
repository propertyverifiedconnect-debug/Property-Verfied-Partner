"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropertyCards from '@/components/shared/property-cards'
import { Button } from '@/components/ui/button'
import inter from '@/lib/font/Inter'
import { ArrowLeft, Search, ChevronRight, Flame } from 'lucide-react'
import Link from 'next/link'

import Nav from '@/components/layout/nav'
import { Skeleton } from '@/components/ui/skeleton'
import ReferCard from '@/components/shared/refer-card'
import { getCookieValue } from '@/function/cookie'
import toast from 'react-hot-toast'
import { useUnauthorize } from '@/function/unthorize'


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

function Page() {
  const [properties, setProperties] = useState<unknown[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const unauthorize = useUnauthorize()

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get("/api/partner/partnerhotleads");
        // Set properties from response
        setProperties(response.data.customer_leads ?? response.data ?? [])
      } catch (err) {
        console.error('Failed to fetch properties', err)
          if (err?.response?.status === 401) {
        unauthorize();
        toast.error("User unauthorized! Please login again.");
      }
        setProperties([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchProperties()
  }, [])

  // Filter properties based on search term
  const filteredProperties = properties.filter((p: any) => {
    if (!searchTerm) return true
    const search = searchTerm.toLowerCase()
    return (
      p?.property_name?.toLowerCase().includes(search) ||
      p?.location?.toLowerCase().includes(search) ||
      p?.customer_name?.toLowerCase().includes(search)
    )
  })

  return (
    <div>
      <Nav/>
      <div className='min-h-screen w-full overflow-hidden bg-[#CDE4F9] py-17 px-4 flex items-center justify-start flex-col'>
        <div className="flex items-center justify-center gap-1 md:gap-3">
          <Link href={"/dashboard/partner"}>
            <Button variant="outline" className="mb-2 rounded-full">
              <ArrowLeft/>
            </Button>
          </Link>

          <div className="flex items-center bg-white rounded-full shadow px-3 w-11/12 max-w-md mb-3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by property name or location..."
              className="w-67 md:w-75 px-3 py-2 text-sm outline-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="py-2 px-5 md:-ml-20 flex items-start w-96">
          <h1 className={`${inter.className} font-bold text-gray-600 text-2xl flex items-center justify-center mb-2 gap-2`}>
            <Flame fill='#0070cc'/>
            <span className='flex items-center justify-center'>
              Hot Lead <ChevronRight/>
            </span>
          </h1>
        </div>

        <div className='h-full w-96 px-3.5 flex flex-col gap-2'>
          {isLoading ? (
            // Show skeleton while loading
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-30 w-full' />
              <Skeleton className='h-30 w-full' />
              <Skeleton className='h-30 w-full' />
              <Skeleton className='h-30 w-full' />
            </div>
          ) : filteredProperties.length > 0 ? (
            // Show filtered properties
            filteredProperties.map((p, i) => (
              <ReferCard key={i} lead={p} type={"admin"} />
            ))
          ) : properties.length === 0 ? (
            // No properties at all
            <div className='text-center py-10'>
              <p className='text-gray-600'>No hot leads available</p>
            </div>
          ) : (
            // Properties exist but search returned nothing
            <div className='text-center py-10'>
              <p className='text-gray-600'>No leads match your search</p>
            </div>
          )}
        </div>
      </div> 
    </div>
  )
}

export default Page