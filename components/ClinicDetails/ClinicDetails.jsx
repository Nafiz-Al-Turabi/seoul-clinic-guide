"use client";
import React from "react";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";
import CustomImage from "@/components/reusable/CustomImage";
import clinicImage from "@/public/clinic.png";
import mapImage from "@/public/map.png";
import { useGetClinicDetailsQuery } from "@/app/store/api/clinicApi";

const ClinicDetails = ({ slug }) => {

    const { data } = useGetClinicDetailsQuery(slug);
    const clinicDetails = data?.data || {};
    const { name, address, subway_station, phone, clinic_category_relation, procedure_clinic_relation, description, location, map_link, operating_hours, website } = clinicDetails || {};
    return (
        <div className="container mx-auto px-4 2xl:px-0">
            <div className="py-6">
                <h3 className="font-bold primary-text">{name}</h3>
                <p className="flex items-center gap-2 primary-text mb-2">
                    <BsGlobeCentralSouthAsia size={14} className="secondary-text" />{" "}
                    {address || "Not available"}
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center gap-2 primary-text space-x-1">
                    <a
                        href={website}
                        target="blank"
                        className="flex items-center gap-2 primary-text"
                    >
                        <CiGlobe className="secondary-text" size={16} />
                        {website || "Not available"}
                    </a>
                    <span className="flex items-center gap-2 primary-text">
                        <IoLocationSharp size={16} className="secondary-text" />
                        {subway_station || location}
                    </span>
                    <span className="flex items-center gap-2 primary-text">
                        <FaPhone size={16} className="secondary-text scale-x-[-1]" />
                        {phone || "Not available"}
                    </span>
                </p>
            </div>
            <div className="flex flex-col xl:flex-row gap-6 mb-6 ">
                <div className="xl:w-[72.5%] rounded-[8px] xl:h-[433px] overflow-hidden">
                    <CustomImage src={clinicDetails?.preview_image_url || clinicImage.src} alt={name} />
                </div>
                <div className="xl:w-[27.5%] bg-white rounded-[8px] p-4 border border-[#EEF3F8]">
                    <div
                        style={{ backgroundImage: `url(${mapImage.src})` }}
                        className="h-[200px] xl:w-[] xl:h-[200px] rounded-[8px] bg-cover bg-center flex justify-center items-center"
                    >
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={map_link}
                            className="primary-bg duration-300 px-4 py-2.5 rounded-full text-white"
                        >
                            View map
                        </a>
                    </div>
                    <div>
                        <p className="text-main font-medium my-2">Operating Hours</p>
                        <div className="space-y-2">
                            {operating_hours?.map((item) => (
                                <div key={item.day} className="flex justify-between text-sm text-gray-800">
                                    <span>{item.day}</span>
                                    <span>{item.open_time}–{item.close_time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <section className="flex flex-col lg:flex-row gap-6 mb-20">
                <div className="w-full h-fit xl:w-[72.5%] space-y-4 bg-[#F9FDFD] p-6 rounded-[8px]">
                    <h5 className="text-[2rem] primary-text font-bold">Overview</h5>
                    <div
                        className="my-12 my-class
                    [&_ol]:list-decimal 
                    [&_ul]:list-disc 
                    [&_li]:ml-6 
                    [&_p]:mt-6
                    lg:[&_p]:text-justify
                    [&_h1]:font-semibold 
                    [&_h2]:font-semibold 
                    [&_h3]:font-semibold 
                    [&_h4]:font-semibold 
                    [&_h5]:font-semibold 
                    [&_h6]:font-semibold
             "
                        dangerouslySetInnerHTML={{
                            __html: description || "",
                        }}
                    />
                </div>
                <div className="xl:w-[27.5%] h-fit border border-[#EEF3F8] rounded-[8px] p-4">
                    <p className="text-sm font-medium text-main">Procedures</p>
                    <div className="grid grid-cols-2 gap-4">
                        {procedure_clinic_relation?.map((item) => (
                            <div
                                key={item.procedure_id}
                                className="flex items-center gap-2 text-sm font-medium text-gray-800"
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                    >
                                        <g clip-path="url(#clip0_5214_6647)">
                                            <path
                                                d="M2.8125 7.03125C3.0625 7.0625 3.28125 7.03125 3.53125 6.96875C3.5625 6.96875 3.5625 6.96875 3.59375 6.96875C4.09375 6.875 4.59375 6.75 4.8125 6.28125C5.0625 5.78125 5.0625 5.1875 5.15625 4.65625C5.25 4.03125 5.3125 3.375 5.3125 2.75C5.3125 1.46875 4.3125 0.5625 3.0625 0.5C1.8125 0.5625 0.8125 1.5 0.8125 2.75C0.8125 3.375 0.875 4.03125 0.96875 4.65625C1 5.15625 1 5.75 1.25 6.25C1.34375 6.4375 1.46875 6.59375 1.65625 6.6875C1.875 6.8125 2.125 6.875 2.34375 6.9375C2.40625 6.9375 2.46875 6.96875 2.53125 6.96875C2.625 7 2.71875 7 2.8125 7.03125ZM2.53125 4.375C2.53125 4.125 2.75 4 3 4.03125C3.3125 4.0625 3.53125 4.1875 3.53125 4.4375C3.53125 4.65625 3.53125 4.875 3.53125 5.09375C3.53125 5.3125 3.53125 5.5 3.53125 5.71875V5.75C3.53125 6 3.375 6.15625 3.09375 6.15625C2.8125 6.1875 2.5625 6.03125 2.5625 5.78125C2.5625 5.5625 2.53125 5.3125 2.53125 5.0625C2.53125 4.84375 2.53125 4.625 2.53125 4.375Z"
                                                fill="#007BBF"
                                            />
                                            <path
                                                d="M18.625 1.40625C18.3125 1.125 17.9688 0.9375 17.6562 0.78125C17.625 0.75 17.5938 0.75 17.5312 0.71875C17.3437 0.59375 17.0938 0.46875 16.875 0.46875C16.75 0.46875 16.6562 0.5 16.5625 0.5625C16.3125 0.75 16.1562 1 16.1875 1.21875C16.2188 1.4375 16.3437 1.625 16.5938 1.75C16.6875 1.78125 16.7812 1.8125 16.8438 1.8125C16.9688 1.8125 17.0937 1.78125 17.2188 1.71875C17.3125 1.6875 17.4062 1.65625 17.4688 1.65625C17.6875 1.65625 17.9375 1.9375 18.1562 2.4375C18.4688 3.125 18.125 3.9375 17.8125 4.625C17.75 4.8125 17.6875 4.96875 17.625 5.125C17.375 5.8125 17.125 6.5 16.875 7.1875C16.6875 7.28125 16.5625 7.4375 16.5312 7.65625C16.4062 8.4375 16.125 8.84375 15.875 9.03125C15.6562 9.1875 15.4375 9.21875 15.3438 9.21875H15.3125H15.2812C15.125 9.21875 15 9.1875 14.875 9.09375C14.6875 8.96875 14.5312 8.78125 14.375 8.5L14.3125 8.34375C14.1562 8 14.0938 7.6875 14.0938 7.625C14.0625 7.4375 13.9688 7.28125 13.8125 7.1875C13.7812 7.15625 13.7812 7.09375 13.75 7.0625C13.375 6.0625 12.9062 4.75 12.4688 3.40625C12.2812 2.78125 12.4375 2.25 12.9062 1.8125C13.0312 1.71875 13.1562 1.625 13.2812 1.625C13.3438 1.625 13.375 1.65625 13.4375 1.6875C13.5312 1.71875 13.625 1.78125 13.7812 1.78125H13.8125C14.1875 1.78125 14.5938 1.53125 14.5938 1.125C14.5938 0.9375 14.5312 0.78125 14.4062 0.65625C14.2812 0.53125 14.0938 0.46875 13.875 0.46875C13.6875 0.46875 13.5312 0.53125 13.375 0.625C13.2812 0.65625 13.1875 0.6875 13.0938 0.71875C12.5625 0.84375 12.0938 1.21875 11.8125 1.75C11.4688 2.375 11.4062 3.09375 11.625 3.78125C12 4.96875 12.4062 6.21875 12.8438 7.5C12.8125 7.59375 12.7812 7.71875 12.8125 7.84375C12.875 8.1875 12.9688 8.53125 13.125 8.84375C13.3438 9.375 13.7188 9.875 14.2188 10.1875C14.3438 10.25 14.4688 10.3125 14.625 10.375H14.75H14.875V12.8438C14.875 15.9688 12.3125 18.5312 9.1875 18.5312C6.0625 18.5312 3.5 15.9688 3.5 12.8438V7.46875C3.3125 7.5 3.15625 7.53125 2.96875 7.53125C2.90625 7.53125 2.8125 7.53125 2.75 7.53125C2.65625 7.53125 2.59375 7.5 2.5 7.5V12.875C2.5 16.5625 5.5 19.5625 9.1875 19.5625C12.875 19.5625 15.875 16.5625 15.875 12.875V10.4062H16.0312C16.4688 10.2812 16.875 9.9375 17.125 9.625C17.5 9.125 17.7188 8.5 17.8125 7.875C17.8438 7.78125 17.8125 7.6875 17.8125 7.59375C17.8438 7.46875 17.9062 7.3125 17.9375 7.1875C18.0938 6.6875 18.2812 6.1875 18.4688 5.6875C18.6562 5.125 18.875 4.53125 19.0938 3.9375C19.1875 3.65625 19.25 3.34375 19.25 3.03125C19.25 2.34375 19.0312 1.78125 18.625 1.40625Z"
                                                fill="#121212"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_5214_6647">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>
                                <span className="text-sm">{item.procedure.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClinicDetails;