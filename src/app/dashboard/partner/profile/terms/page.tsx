"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CircleCheck, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import inter from '@/lib/font/Inter';
import Nav from '@/components/layout/nav';
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
    const [expandedSection, setExpandedSection] = useState<number | null>(null);

    const toggleSection = (index: number) => {
        setExpandedSection(expandedSection === index ? null : index);
    };

    const termsContent = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using Property Verified services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services."
        },
        {
            title: "2. Service Description",
            content: "Property Verified provides property verification, documentation, and information services. We strive to provide accurate and up-to-date information, but we do not guarantee the completeness or accuracy of all data. Users are responsible for verifying critical information independently."
        },
        {
            title: "3. User Responsibilities",
            content: "Users must provide accurate information when using our services. You are responsible for maintaining the confidentiality of your account credentials. Any activities conducted through your account are your responsibility. Users must not misuse our services for illegal activities or fraudulent purposes."
        },
        {
            title: "4. Privacy Policy",
            content: "We collect and process personal information in accordance with applicable data protection laws. Your data is used solely for providing our services and will not be shared with third parties without your consent, except as required by law. We implement appropriate security measures to protect your information."
        },
        {
            title: "5. Payment Terms",
            content: "All fees for our services are clearly displayed before purchase. Payments are processed securely through authorized payment gateways. Refund policies vary by service type and are outlined at the time of purchase. Users are responsible for any applicable taxes."
        },
        {
            title: "6. Intellectual Property",
            content: "All content, trademarks, and data on Property Verified are the property of our company or our licensors. Users may not reproduce, distribute, or create derivative works from our content without explicit written permission."
        },
        {
            title: "7. Limitation of Liability",
            content: "Property Verified provides information services and is not liable for decisions made based on our reports. We are not responsible for indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the amount paid for the specific service in question."
        },
        {
            title: "8. Dispute Resolution",
            content: "Any disputes arising from these terms shall be resolved through arbitration in Pune, Maharashtra, India. Users agree to first attempt to resolve disputes through good faith negotiations before pursuing legal action."
        },
        {
            title: "9. Modifications to Terms",
            content: "We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or through our platform. Continued use of our services after modifications constitutes acceptance of the updated terms."
        },
        {
            title: "10. Termination",
            content: "We reserve the right to terminate or suspend access to our services immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion."
        }
    ];

    const menuItems = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: "Terms & Conditions",
            description: "Read our terms and policies"
        }
    ];

    return (
        <>
       <Nav setActive={"profile"}/>
        <div className={`min-h-screen px-5 w-full mt-10 bg-[#CDE4F9] justify-center pb-20 flex flex-col items-center  ${inter.className}`}>
            {/* Menu Items */}
            <div className="w-full md:w-[40rem] mt-6 space-y-4">
               <div className='w-full z-[99]'>
             
             <Link href={"/dashboard/partner"}>
                <div className='h-10 w-10 flex items-center justify-center text-pvr  rounded-2xl  bg-white mt-10'>
                    <ArrowLeft size={19}/>
                </div>
             
             </Link>
         </div>
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className="w-full bg-white rounded-2xl shadow-md p-5 flex items-center gap-4"
                    >
                        <div className="h-12 w-12 rounded-full bg-[#CDE4F9] flex items-center justify-center text-gray-700">
                            {item.icon}
                        </div>
                        <div className="flex-1 text-left">
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#0066CC]">
                                {item.title} <CircleCheck size={19}/>
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Terms & Conditions Content */}
            <div className="w-full md:w-[40rem] mt-6 bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Terms & Conditions</h2>
                <p className="text-sm text-gray-500 mb-6">Last updated: December 2024</p>
                
                <div className="space-y-3">
                    {termsContent.map((section, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleSection(index)}
                                className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <h3 className="text-md font-semibold text-gray-800 text-left">
                                    {section.title}
                                </h3>
                                {expandedSection === index ? (
                                    <ChevronUp className="w-5 h-5 text-gray-600" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-600" />
                                )}
                            </button>
                            {expandedSection === index && (
                                <div className="p-4 bg-white">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {section.content}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                        <strong>Questions about our terms?</strong> Contact us at{' '}
                        <a href="mailto:legal@propertyverified.com" className="text-[#0066CC] hover:underline">
                            legal@propertyverified.com
                        </a>
                    </p>
                </div>
            </div>

            {/* About Section */}
     
        </div>
        </>
    );
};

export default page;