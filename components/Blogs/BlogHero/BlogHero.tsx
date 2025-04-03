import React from 'react';
import blogHeroImage from "@/public/assets/images/blogHero.png";
const BlogHero = () => {
    return (
        <div style={{ backgroundImage: `url(${blogHeroImage.src})` }} className="relative w-full bg-position-center bg-cover bg-center bg-no-repeat h-[669px]">
            <div className="absolute inset-0 bg-black/5 z-0"></div>
            <div className='max-w-[86rem] mx-auto px-4 2xl:px-0 flex flex-col justify-center h-full'>
                <h1 className='font-bold text-white'>Blog Page</h1>
                <p className='text-2xl font-medium text-white'>Read about the top rated blogs written by the exparts</p>
            </div>
        </div>
    );
};

export default BlogHero;