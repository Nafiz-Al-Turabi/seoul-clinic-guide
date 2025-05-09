'use client'
import React from 'react';
import cellImage from '@/public/assets/categoryImage/cell.svg'
import hairImage from '@/public/assets/categoryImage/hair-removal.svg'
import botoxImage from '@/public/assets/categoryImage/botox.svg'
import urologyImage from '@/public/assets/categoryImage/urology.svg'
import noseImage from '@/public/assets/categoryImage/nose-surgery.svg'
import dentalImage from '@/public/assets/categoryImage/dental.svg'
import orientalImage from '@/public/assets/categoryImage/obstetrics.svg'
import faceImage from '@/public/assets/categoryImage/chin-lift.svg'
import skinImage from '@/public/assets/categoryImage/skin-care.svg'
import gynecologyImage from '@/public/assets/categoryImage/obstetrics.svg'
import makeupImage from '@/public/assets/categoryImage/eyebrow.svg'
import othersImage from '@/public/assets/categoryImage/others.svg'


import CustomImage from '@/components/reusable/CustomImage';
import { useRouter } from 'next/navigation';



const categories = [
    { icon: cellImage, label: 'Stem Cell', url: '/categories?category=6a17b3e3-62c3-42aa-8c5b-736e406eef8b' },
    { icon: hairImage, label: 'Hair Removal', url: '/categories?category=08bac345-e8fa-46fd-9189-adb5a1286ae0' },
    { icon: botoxImage, label: 'Botox', url: '/categories?category=d3e712e7-de40-4cc9-a269-b6a4eb6fd05b' },
    { icon: urologyImage, label: 'Urology', url: '/categories?category=35e7fe92-7782-4c13-b6e5-c63d3dbf0975' },
    { icon: noseImage, label: 'Nose Surgery', url: '/categories?category=cf60bd9b-af51-4a06-b6c8-139650b65540' },
    { icon: dentalImage, label: 'Dental', url: '/categories?category=495bde35-3de3-47d4-a16b-b241a527dbb9' },
    { icon: orientalImage, label: 'Oriental Medicine', url: '/categories?category=3274cfbf-cfcf-4a6f-987e-82a41a38c4ee' },
    { icon: faceImage, label: 'Face Lift' , url: '/categories?category=1c885913-3e2b-4442-9abd-c79c43fdce0c'},
    { icon: skinImage, label: 'Skin care', url: '/categories?category=08bcbb11-cb3f-46cf-9862-8d5f12d78e51' },
    { icon: gynecologyImage, label: 'Obstetrics and Gynecology', url: '/categories?category=1f01c0a7-8b2d-482f-969f-0994e76d1a0c' },
    { icon: makeupImage, label: 'Microblading and makeup', url: '/categories?category=60092c26-dd77-4159-8692-a42b8ed717eb' },
    { icon: othersImage, label: 'Others', url: '/categories?category=593dc849-bfb2-4b2d-b5ab-1de06c995625' }
];




const PopularCategories = () => {
    const router = useRouter();

    const handleCategoryClick = (url: string) => {
        router.push(url);
    }
    return (
        <div className="container mx-auto px-4 2xl:px-0">
            <div className='mb-12'>
                <h3 className="mb-6 font-bold  primary-text">Popular Categories</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-10 ">
                {categories.map((category, index) => (
                    <div  key={index} className='flex flex-col lg:w-[80px] items-center '>
                        <div
                            onClick={() => handleCategoryClick(category.url)}
                            className=" h-[80px] w-[80px] flex flex-col items-center justify-center p-4 bg-[#E8F7F7] rounded-[10px] border-2 border-[#A1D5F0] hover:bg-[#e8f7f7b2] transition-colors duration-300 cursor-pointer"
                        >
                            <CustomImage src={category.icon} alt={category.label} />

                        </div>
                        <p className="text-xs text-center text-gray-700 font-medium mt-3 w-[16ch]">
                            {category.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCategories;