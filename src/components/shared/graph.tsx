"use client";
import React, { use, useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { getCookieValue } from "@/function/cookie";
import MiddlewareLoader from "./middleware-loader";
import inter from "@/lib/font/Inter";

export default function MobileHighgraph() {
  const containerRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(320);
  const [GraphData, setGraphData] = useState({});
    const [loading, setLoading] = useState(true);

  const BASEURL = process.env.NEXT_PUBLIC_API_URL;

  // Dropdown filter states
  const [month, setMonth] = useState("All Months");
  const [year, setYear] = useState("2025");

  const months = [
    "All Months",
    ...(GraphData?.[year]
      ? Object.keys(GraphData[year]).filter((m) => m !== "All Months")
      : []),
  ];
  const years = Object.keys(GraphData || {});

  // Responsive chart height
  useEffect(() => {
    const setResponsiveHeight = () => {
      const width = window.innerWidth;
      if (width <= 360) setChartHeight(300);
      else if (width <= 420) setChartHeight(340);
      else if (width <= 640) setChartHeight(380);
      else setChartHeight(420);
    };
    setResponsiveHeight();
    window.addEventListener("resize", setResponsiveHeight);
    return () => window.removeEventListener("resize", setResponsiveHeight);
  }, []);

function calculatePropertyStatistics(properties: Property[]): YearData {
  const categories = ["approved", "Contact", "Purchase"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const stats: YearData = {};

  properties.forEach((property) => {
    const createdDate = new Date(property.created_at);
    if (isNaN(createdDate.getTime())) return;

    const year = createdDate.getFullYear().toString();
    const month = monthNames[createdDate.getMonth()];

    // Ensure year exists
    if (!stats[year]) {
      stats[year] = {};
    }

    // Ensure month exists with default values
    if (!stats[year][month]) {
      stats[year][month] = [0, 0, 0];
    }

    // Ensure "All Months" exists
    if (!stats[year]["All Months"]) {
      stats[year]["All Months"] = [0, 0, 0];
    }

    // STATUS mapping
    let index = -1;
    const status = property.status?.toLowerCase() || "";

    if (status.includes("approved")) index = 0;
    else if (status.includes("contact")) index = 1;
    else if (status.includes("purchase")) index = 2;

    if (index !== -1) {
      stats[year][month][index]++;
      stats[year]["All Months"][index]++;
    }
  });

  return stats;
}


  useEffect(() => {
    const fetchProperties = async () => {
         setLoading(true);
      try {
         const response =  await axios.get("/api/partner/booking-list");

        const stats = calculatePropertyStatistics(response.data.booking);
        setGraphData(stats);

        const availableYears = Object.keys(stats);

        if (availableYears.length > 0) {
          setYear(availableYears[0]);
          setMonth("All Months");
        }

        console.log(response.data.booking);
      } catch (err) {
        console.error("Failed to fetch properties", err);
      }finally{
 setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  // Example mock data (Month & Year-wise)
  const sampledata = {
    "2025": {
      January: [40, 30, 10],
      February: [35, 25, 8],
      March: [45, 32, 9],
      "All Months": [120, 87, 27],
    },
    "2024": {
      January: [30, 20, 6],
      February: [28, 22, 4],
      March: [33, 24, 5],
      "All Months": [95, 66, 18],
    },
  };

  const categories = ["Bookings", "Contact", "Purchase"];

  const data = GraphData?.[year]?.[month] ||
    GraphData?.[year]?.["All Months"] || [0, 0, 0];

  const options = {
    chart: {
      type: "column",
      height: chartHeight,
      backgroundColor: null,
      spacing: [8, 8, 8, 8],
    },
    title: {
      text: `Analytics - ${month}, ${year}`,
      align: "left",
      style: { fontSize: "14px", fontWeight: 600 },
    },
    xAxis: {
      categories,
      labels: { style: { fontSize: "11px" } },
      tickLength: 0,
    },
    yAxis: {
      title: { text: null },
      labels: { style: { fontSize: "11px" } },
      gridLineDashStyle: "ShortDash",
    },
    tooltip: {
      shared: true,
      backgroundColor: "rgba(255,255,255,0.95)",
      borderRadius: 8,
      shadow: true,
    },
    legend: { enabled: false },
    credits: { enabled: false },
    series: [
      {
        name: "Count",
        data,
        color: "#2396C6",
        borderColor: "#2396C6",
      },
    ],
  };

  return (
    <div className="py-3   mt-3 max-w-md mx-auto" ref={containerRef}>
      {/* Filters Section */}
      <div className="flex justify-between items-center mb-3 gap-2">
        {/* Month Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="text-[#2396C6] border-[#2396C6] hover:bg-[#2396C6] hover:text-white flex items-center gap-1"
            >
              {month} <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="max-h-60 overflow-y-auto"
          >
            {months.map((m) => (
              <DropdownMenuItem key={m} onClick={() => setMonth(m)}>
                {m}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Year Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="text-[#2396C6] border-[#2396C6] hover:bg-[#2396C6] hover:text-white flex items-center gap-1"
            >
              {year} <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {years.map((y) => (
              <DropdownMenuItem key={y} onClick={() => setYear(y)}>
                {y}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chart Section */}
       { loading ? 
  <div className="bg-white/90  flex items-center justify-center h-96 dark:bg-slate-900/80 p-2 w-full rounded-2xl shadow-sm">
                 <svg className='svg' viewBox="25 25 50 50">
  <circle className='circle' r="20" cy="50" cx="50"></circle>
</svg>
         </div>
          :
        
        Object.keys(GraphData).length !== 0  ?
      <div className="bg-white/90 dark:bg-slate-900/80 p-2 w-full rounded-2xl shadow-sm">
         <HighchartsReact highcharts={Highcharts} options={options} />
         
      </div>
         :
  <div className="bg-white/90  flex items-center justify-center h-96 dark:bg-slate-900/80 p-2 w-full rounded-2xl shadow-sm">
              <h1 className={`text-xl font-bold text-gray-400 ${inter.className}`}>No Booking Availabe </h1>
         </div>
        
       }
       
    </div>
  );
}
