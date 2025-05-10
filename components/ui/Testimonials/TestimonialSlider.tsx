"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import testimonial1 from "@/public/assets/images/testimonials.jpg";

const testimonials = [
  {
    name: "Jonathan S.",
    location: "Texas",
    message:
      "As someone who recently moved to a new city and was referred by family in the past, Opencare made it easy for me to find a highly-rated dentist.",
    image: testimonial1,
  },
  {
    name: "Emily R.",
    location: "California",
    message:
      "I was nervous about finding a new doctor. This platform made it simple and stress-free.",
    image: testimonial1,
  },
];

const randomBlobClasses = [
  "rounded-[40%_60%_60%_40%/40%_40%_60%_60%]",
  "rounded-[60%_40%_30%_70%/60%_30%_70%_40%]",
  "rounded-[50%_50%_40%_60%/50%_50%_40%_60%]",
  "rounded-[55%_45%_65%_35%/60%_35%_65%_40%]",
  "rounded-[30%_70%_60%_40%/50%_50%_60%_40%]",
  "rounded-[45%_55%_70%_30%/65%_30%_60%_40%]",
  "rounded-[65%_35%_45%_55%/60%_45%_40%_55%]",
  "rounded-[38%_62%_58%_42%/62%_38%_58%_42%]",
  "rounded-[60%_40%_50%_50%/55%_45%_35%_65%]",
  "rounded-[48%_52%_68%_32%/50%_60%_40%_50%]",
];

// Custom Arrows
const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#68B0D4] text-white rounded-full p-3 shadow-md cursor-pointer"
  >
    <MdArrowBackIos />
  </button>
);

const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#68B0D4] text-white rounded-full p-3 shadow-md cursor-pointer"
  >
    <MdArrowForwardIos />
  </button>
);

const TestimonialSlider = () => {
  const settings = {
    // dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots: any) => (
      <div className="absolute -left-0 bottom-4 md:bottom-6">
        <ul className="space-y-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
    ),
  };

  return (
    <div className="relative container mx-auto  px-4 2xl:px-0 py-12">
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => {
          const blobClass = randomBlobClasses[index % randomBlobClasses.length];
          return (
            <div key={index}>
              <div className="lg:px-20 mx-auto flex flex-col lg:flex-row items-center justify-between ">
                {/* Text Section */}
                <div className="text-center md:text-left space-y-6 max-w-2xl">
                  <h2 className="primary-text mb-4 font-bold xl:w-[16ch]">
                    All this feedback is making us blush.
                  </h2>
                  <p className="text-main text-lg mb- xl:w-[50ch] leading-[180%]">
                    "{testimonial.message}"
                  </p>
                  <div>
                    <p className="text-lg font-bold text-main">
                      {testimonial.name}
                    </p>
                    <p className="text-main">{testimonial.location}</p>
                  </div>
                </div>

                {/* Image Section */}
                <div className="w-[300px] h-[300px] xl:w-[450px] xl:h-[450px] overflow-hidden">
                  <div className={`w-full h-full ${blobClass} overflow-hidden`}>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={450}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
