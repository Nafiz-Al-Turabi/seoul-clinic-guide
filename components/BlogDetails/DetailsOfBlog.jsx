import React from 'react';
import blogHeroImage from "@/public/assets/images/blogHero.png";
import Image from 'next/image';
import image from '@/public/profile.png'
import image2 from '@/public/assets/stemCellImages/stem-cell.jpg'



const DetailsOfBlog = () => {
    return (
        <div>
            <header style={{ backgroundImage: `url(${blogHeroImage.src})` }}
                className="relative w-full bg-position-center bg-cover bg-center bg-no-repeat h-[30vh] sm:h-[40vh] lg:h-[70.7vh]">
                <div className="absolute inset-0 bg-gradient-to-l to-black/10 from-transparent z-0"></div>
                <div className="max-w-[86rem] mx-auto px-4 2xl:px-0 flex flex-col justify-center h-full relative z-10">
                    <h1 className="font-bold text-white text-4xl md:text-5xl lg:text-6xl ">
                        Blog page
                    </h1>
                    <p className="text-lg sm:text-2xl font-medium text-white  mt-4">
                        Read about the top rated blogs written by the exparts
                    </p>
                </div>
            </header>
            <section className='max-w-[828px] mx-auto px-4 2xl:px-0 py-[32px]'>
                <h5 className='text-lg sm:text-[1.5rem] lg:text-[2rem] font-semibold primary-text tracking-[-1.28] '>Masseter Botox in Korea | Best Clinics, Costs, Procedure Types & More</h5>
                <div className='flex items-center gap-3 py-[32px]  border-b border-[#D7D7D7] '>
                    <div className='w-[67px] h-[67px] rounded-full overflow-hidden flex items-center justify-center'>
                        <Image src={image} height={67} width={67} alt="" />
                    </div>
                    <div>
                        <h5 className='text-lg font-semibold primary-text'>Blake Lawit</h5>
                        <p className='text-base font-medium'>B.V Clinic</p>
                        <p className='text-sm text-[#B4B4B4]'>February 22, 2023</p>
                    </div>
                </div>
                <div className='my-12'>
                    <h5 className='text-[1rem] lg:text-[1.5rem] text-[#68B0D4] font-bold '>Masseter Botox Overview</h5>
                    <p className='text-sm sm:text-base'>Masseter Botox is a non-surgical cosmetic procedure that involves the injection of botulinum toxin into the masseter muscles, which are located in the jaw area. This treatment is primarily used for aesthetic and medical purposes, offering a variety of benefits, from slimming the jawline to alleviating symptoms of certain medical conditions.
                    </p>
                    <Image src={image2} alt="" className='my-4 aspect-3/2' />
                </div>
            </section>
        </div>
    );
};

export default DetailsOfBlog;