"use client";
import BlogCard from "@/components/ui/Cards/BlogCard";
import blog1 from "@/public/assets/recentBlog/recent-blog1.png";
import blog2 from "@/public/assets/recentBlog/recent-blog2.png";
import { useState } from "react";

const blogs = [
    {
      id: 1,
      title: "Masseter Botox in Korea",
      desc: "Imagine achieving a softer, more contoured jawline without undergoing surgery—this is t...",
      date: "Feb 16, 2025 4:02 am",
      image: blog1,
      category: "Cosmetics",
    },
    {
      id: 2,
      title: "Hyperhidrosis Botox in Korea",
      desc: "Are you tired of constantly battling excessive sweating that impacts your daily life an...",
      date: "Feb 16, 2025 4:02 am",
      image: blog2,
      category: "Procedures",
    },
    {
      id: 3,
      title: "Vaginal Tightening Laser in Korea",
      desc: "Imagine a world where women can reclaim their intimate health and confidence throug...",
      date: "Feb 16, 2025 4:02 am",
      image: blog1,
      category: "Procedures",
    },
    {
      id: 4,
      title: "ONDA Lifting in Korea",
      desc: "Are you struggling with stubborn skin laxity or seeking to enhance your facial contou amar hisnd jf njus ok  okf [pf kjnhdf hsfus ,sjflksf khf sjpjn snksfi ksjfois ba aohdf iohfbsf  osjf f,sfofjs;[poms;lfiu jjhisuf iosfu",
      date: "Feb 16, 2025 4:02 am",
      image: blog2,
      category: "Cosmetics",
    },
    {
      id: 5,
      title: "PRP Hair Restoration in Korea",
      desc: "Platelet-rich plasma therapy for hair restoration offers a natural solution to combat hair thinning and loss...",
      date: "Feb 17, 2025 6:15 pm",
      image: blog1,
      category: "Procedures",
    },
    {
      id: 6,
      title: "Non-Surgical Rhinoplasty in Korea",
      desc: "Enhance the shape of your nose without going under the knife, all thanks to non-surgical rhinoplasty...",
      date: "Feb 18, 2025 3:45 pm",
      image: blog2,
      category: "Cosmetics",
    },
    {
      id: 7,
      title: "Korean Skin Whitening Treatments",
      desc: "Discover the secrets behind Korea’s skin whitening treatments, designed to brighten and even out skin tone...",
      date: "Feb 19, 2025 8:20 am",
      image: blog1,
      category: "Cosmetics",
    },
    {
      id: 8,
      title: "BBL (Brazilian Butt Lift) in Korea",
      desc: "Get the body of your dreams with a BBL procedure in Korea, offering natural-looking results without surgery...",
      date: "Feb 20, 2025 5:30 pm",
      image: blog2,
      category: "Liposuction",
    },
    {
      id: 9,
      title: "Laser Hair Removal in Korea",
      desc: "Say goodbye to shaving with advanced laser hair removal treatments in Korea, offering smooth and hair-free skin...",
      date: "Feb 21, 2025 2:10 pm",
      image: blog1,
      category: "Cosmetics",
    },
    {
      id: 10,
      title: "Stem Cell Therapy in Korea",
      desc: "Explore the latest in regenerative medicine with stem cell therapy to help restore youthful vitality...",
      date: "Feb 22, 2025 7:25 am",
      image: blog2,
      category: "Procedures",
    },
    {
      id: 11,
      title: "Fat Freezing in Korea",
      desc: "Target stubborn fat areas and sculpt your body with the innovative fat freezing technique available in Korea...",
      date: "Feb 23, 2025 9:40 pm",
      image: blog1,
      category: "Liposuction",
    },
    {
      id: 12,
      title: "Ultherapy in Korea",
      desc: "Ultherapy is a non-invasive treatment designed to lift and tighten skin on the face, neck, and décolletage...",
      date: "Feb 24, 2025 11:15 am",
      image: blog2,
      category: "Cosmetics",
    },
    {
      id: 13,
      title: "Microneedling in Korea",
      desc: "Microneedling is a popular skin treatment that can improve texture, reduce scarring, and rejuvenate the skin...",
      date: "Feb 25, 2025 6:40 pm",
      image: blog1,
      category: "Cosmetics",
    },
    {
      id: 14,
      title: "Korean Eyelid Surgery (Double Eyelid Surgery)",
      desc: "Achieve your desired eyelid appearance with Korea’s famous double eyelid surgery techniques...",
      date: "Feb 26, 2025 10:30 am",
      image: blog2,
      category: "Procedures",
    },
    {
      id: 15,
      title: "Korean Lip Filler Treatments",
      desc: "Full, plump lips are just a treatment away with advanced lip filler options in Korea...",
      date: "Feb 27, 2025 8:50 pm",
      image: blog1,
      category: "Cosmetics",
    },
    {
      id: 16,
      title: "Facial Contouring with Fillers in Korea",
      desc: "Non-surgical facial contouring is an option to enhance your features with a youthful and fresh appearance...",
      date: "Feb 28, 2025 4:00 am",
      image: blog2,
      category: "Cosmetics",
    },
  ];
  

const blogsTabs = [
  "All Blogs",
  "Procedures",
  "Cosmetics",
  "Liposuction",
  "Reviews",
];

const BlogCategories = () => {
  const [activeTab, setActiveTab] = useState(blogsTabs[0]);
  const filteredBlogs = activeTab === "All Blogs"
  ? blogs
  : blogs.filter((blog) => blog.category === activeTab);
  return (
    <div className="max-w-[86rem] mx-auto px-4 2xl:px-0 py-24">
      <div className="flex overflow-x-auto mb-8">
        <div className="flex justify-items-end gap-4 w-max">
          {blogsTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs sm:text-sm lg:text-lg whitespace-nowrap rounded-full px-6 py-2.5 transition-all duration-200 cursor-pointer border
                  ${
                    activeTab === tab
                      ? "bg-[#68B0D4] text-white shadow-md border-transparent"
                      : "border-[#EEF3F8] text-main"
                  }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
