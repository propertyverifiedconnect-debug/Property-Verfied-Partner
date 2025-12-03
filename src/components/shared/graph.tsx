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

export default function MobileHighgraph() {
  const containerRef = useRef(null);
  const [chartHeight, setChartHeight] = useState(320);
  const [GraphData, setGraphData] = useState({});

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
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Initialize the statistics object
    const stats: YearData = {};

    // Process each property
    properties.forEach((property) => {
      const createdDate = new Date(property.created_at);
      const year = createdDate.getFullYear().toString();
      const month = monthNames[createdDate.getMonth()];

      // Initialize year if it doesn't exist
      if (!stats[year]) {
        stats[year] = {
          "All Months": [0, 0, 0],
        };
      }

      // Initialize month if it doesn't exist
      if (!stats[year][month]) {
        stats[year][month] = [0, 0, 0];
      }

      // Map status to category index
      let categoryIndex = -1;
      const status = property.status?.toLowerCase() || "";

      if (status.includes("approved")) {
        categoryIndex = 0; // Bookings
      } else if (status.includes("contact")) {
        categoryIndex = 1; // Contact
      } else if (status.includes("purchase")) {
        categoryIndex = 2; // Purchase
      }

      // Increment the count for the appropriate category
      if (categoryIndex !== -1) {
        stats[year][month][categoryIndex]++;
        stats[year]["All Months"][categoryIndex]++;
      }
    });

    console.log(stats);
    return stats;
  }

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/api/user/getApprovedBooking`,
          {
            headers: {
              Authorization: `Bearer ${getCookieValue()}`, // <-- Add your JWT token here
            },
          }
        );

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
    GraphData?.[year]?.["All Months"] || [0, 0, 0, 0];

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
       {
        Object.keys(GraphData).length !== 0  ?
      <div className="bg-white/90 dark:bg-slate-900/80 p-2 w-full rounded-2xl shadow-sm">
         <HighchartsReact highcharts={Highcharts} options={options} />
         
      </div>
         :

          <div className="bg-white/90  flex items-center justify-center h-96 dark:bg-slate-900/80 p-2 w-full rounded-2xl shadow-sm">
                 <svg className='svg' viewBox="25 25 50 50">
  <circle className='circle' r="20" cy="50" cx="50"></circle>
</svg>
         </div>
       }
       
    </div>
  );
}
