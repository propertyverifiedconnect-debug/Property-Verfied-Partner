"use client";

import React, { useState } from 'react'
import useRedirectByRole from '@/hooks/useRedirectByRole';
import PartnerDashboard from '@/components/layout/profile-menu';
import Nav from '@/components/layout/nav';
import MiddlewareLoader from '@/components/shared/middleware-loader';
import BottomNav from '@/components/shared/bottom-nav';
import UserProfile from '@/components/layout/user-profile';


type ActiveTab = "Home" | "Profile" | string;
function Page() {
  const loading = useRedirectByRole();

 const [active, setActive] = useState<ActiveTab>("Home");

   if (loading) {
    return <MiddlewareLoader/>; // or a spinner
  }
  return (
    <>
     <Nav setActive={setActive} />
    {!loading &&
    
    <>
  
   <div className="min-h-screen w-full flex items-center justify-center pb-10 bg-[#CDE4F9]  ">

   {active == "Home" ?
          <PartnerDashboard/>
          :
          <div className='mt-10 w-full  '>
            <UserProfile/>
          </div>
       
       } 


   <BottomNav active={active} setActive={setActive} type={'other'}/>
   </div>
    
    </>
    
    }
    
    </>  
    
  )
}

export default Page