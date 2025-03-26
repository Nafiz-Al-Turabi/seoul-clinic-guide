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

const categories = [
    { icon: cellImage, label: 'Stem Cell' },
    { icon: hairImage, label: 'Hair Removal' },
    { icon: botoxImage, label: 'Botox' },
    { icon: urologyImage, label: 'Urology' },
    { icon: noseImage, label: 'Nose Surgery' },
    { icon: dentalImage, label: 'Dental' },
    { icon: orientalImage, label: 'Oriental Medicine' },
    { icon: faceImage, label: 'Face Lift' },
    { icon: skinImage, label: 'Skin care' },
    { icon: gynecologyImage, label: 'Obstetrics and Gynecology' },
    { icon: makeupImage, label: 'Microblading and makeup' },
    { icon: othersImage, label: 'Others' }
];

const PopularCategories = () => {
    return (
        <div className="container mx-auto px-4 2xl:px-0">
            <div className='mb-12'>
                <h3 className="mb-6 font-bold  primary-text">Popular Categories</h3>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-10 ">
                {categories.map((category, index) => (
                    <div className='w-full flex flex-col items-center justify-center '>
                        <div
                            key={index}
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