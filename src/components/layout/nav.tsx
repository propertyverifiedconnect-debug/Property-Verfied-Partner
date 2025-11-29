"use client"
import React, { useEffect ,useState } from 'react'
import Image  from 'next/image'
import { Bell } from 'lucide-react'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';  


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional CSS variable
});

function Nav({setActive}) {
   const [user, setUser] = useState();
   useEffect(() => {
        const storedUser = localStorage.getItem("partnerdata");
        if (storedUser) {
            const parsed = JSON.parse(storedUser) as User;
            setUser(parsed);
        }
    }, []);
  const searchParams = useSearchParams();
  const profile = searchParams.get('profile')
   const Home = searchParams.get('Home')

   if (profile === 'true') setActive("Profile")
       if (Home === 'true') setActive("Home")
  


  return (
    <div className='h-12 fixed top-0 md:gap-0 gap-55  z-99 w-full md:p-4 px-0 bg-white shadow flex items-center justify-between'>
          <div className='h-10 w-50  scale-110 flex items-center justify-center'>
           
        <Image src={'/image/Logo.png'} height={120} width={100} alt='logo'/>
          </div>

<div className={`${inter.className}  font-medium text-gray-600  md:flex items-center justify-center gap-10 pr-2 md:pr-20`}>
     <div className=' md:flex gap-10 hidden  '>
     
    <Link href={"/dashboard/partner?Home=true"}>
       <h1 onClick={()=>setActive("Home")}  className=' cursor-pointer' >Home</h1>
    </ Link>
      <Link href={"/dashboard/partner?profile=true"}>

       <h1  onClick={()=>setActive("Profile") }  className=' cursor-pointer'>Profile</h1>
    </ Link>
  

  
      
     </div>
     <div className='flex gap-3 items-center '>
  


<div className='h-10 w-10 bg-[#2396C6] text-white  flex items-center justify-center  border-2  rounded-full'>
       <h1>
          {user?.name.slice(0,1)}
       </h1>
</div>

     </div>


</div>
        


    </div>
  )
}

export default Nav