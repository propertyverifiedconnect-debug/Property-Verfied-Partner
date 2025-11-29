import { Heart, MapPin, Calendar, Clock, Phone, Mail, Icon, Star, ChevronRight, Delete, Trash } from 'lucide-react'
import React from 'react'
import inter from '@/lib/font/Inter'
import { motion } from "framer-motion" 
import Link from 'next/link'

// Define the types for the property and its nested objects
interface Property {
  id: string;
  status: 'approved' | 'contact' | 'purchase';
  visiting_date?: string;
  visiting_time?: string;
  created_at: string;
 
}

interface BookingCardsProps {
  property: Property;
  type: 'partner' | 'admin';
}

function PropertyCards2({ property, type }: BookingCardsProps) {
  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Status badge color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'contact': return 'bg-blue-100 text-blue-700';
      case 'purchase': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-4 w-full shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      {/* Header with Image and Basic Info */}
      <div className="flex gap-3 mb-3">
        <div className="relative">
          <img
            src={property.photos[0] ||  ""}
            alt={property.property_name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <span className={`absolute capitalize top-1 right-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${getStatusColor(property.status)}`}>
            {property.status}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1 min-w-0">
              <h3 className={`${inter.className} font-semibold text-gray-900 text-sm truncate`}>
                {property.property_name}
              </h3>
              <p className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                <MapPin size={12} />
                <span className="truncate capitalize flex  items-center justify-center ">{property.city} <ChevronRight size={12} className='mt-0.5'/> {property.location}</span>
              </p>
            </div>
            <Trash size={18} className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors flex-shrink-0 ml-2" />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded">
              {property.property_type == "Independent House / Villa" ?"House / Villa":property.property_type}
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
              ₹{property.price.toLocaleString('en-IN')}
            </span>
          </div>
            <div className="flex items-center-center gap-2">
          <span className="bg-gray-100 text-gray-700 mt-1 text-xs font-semibold px-2 py-1 rounded">
              {property.looking_for}
            </span>
        </div>
        </div>
      </div>
 <div className="flex items-center h-auto   gap-2">
  <span className="bg-gray-100 text-gray-700 mt-1 text-xs font-semibold px-2 py-1 rounded line-clamp-2">
    {property.description}
  </span>
</div>


      {/* Divider */}
      <div className="border-t border-gray-100 my-3"></div>

      {/* People Info */}
     

      {/* Visiting Details (if available) */}
    

      {/* Config/Notes */}
      {property.config && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2 bg-gray-50 p-2 rounded">
          {property.config}
        </p>
      )}

      {/* Action Button */}
      <Link href={type === "partner" 
        ? `/dashboard/partner/partner-listed-property/${property.id}`
        : `/dashboard/admin/booking-approval/${property.id}`
      }>
        <button className={`${inter.className} w-full bg-pvr hover:bg-[#0070dd] text-white font-semibold py-2 rounded-lg text-sm transition-colors`}>
          View Details
        </button>
      </Link>

      {/* Booking Date Footer */}
      <p className="text-xs text-gray-400 text-center mt-2">
        Listed on {formatDate(property.created_at)}
      </p>
    </motion.div>
  )
}

export default PropertyCards2