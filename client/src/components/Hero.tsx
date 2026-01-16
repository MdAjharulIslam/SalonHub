import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
declare module "swiper/css";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
import { useNavigate } from "react-router-dom";


import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";
import banner6 from "../assets/banner6.png";

const Hero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const slides = [
    { id: 1, img: banner1, title: "Luxury Hair Styling", subtitle: "Expert stylists for perfect haircuts" },
    { id: 2, img: banner2, title: "Pampering Spa Treatments", subtitle: "Relax, refresh, and rejuvenate" },
    { id: 3, img: banner3, title: "Manicure & Pedicure", subtitle: "Elegant nails for every occasion" },
    { id: 4, img: banner4, title: "Bridal & Event Makeup", subtitle: "Look stunning on your special day" },
    { id: 5, img: banner5, title: "Hair Coloring & Highlights", subtitle: "Vibrant colors, professional care" },
    { id: 6, img: banner6, title: "Manicure & Pedicure", subtitle: "Look stunning on your special day" },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/services?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative w-full h-[700px] lg:h-[770px] rounded-3xl overflow-hidden shadow-2xl px-10 mb-10">
    
      <div className="absolute top-[-50px] left-[-50px] w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-60px] right-[-40px] w-72 h-72 bg-white/5 rounded-full blur-2xl animate-ping"></div>
      <div className="absolute top-10 right-10 w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
      <div className="absolute top-20 left-1/4 w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
                
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10 rounded-3xl"></div>

              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 md:px-12 gap-2">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-2xl mb-6 drop-shadow-md">
                  {slide.subtitle}
                </p>

                <div className="flex gap-4 flex-wrap justify-center">
                  <button
                    onClick={() => navigate("/services")}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-purple-600 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    Book Now
                  </button>
                  <button
                    onClick={() => navigate("/services")}
                    className="px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white/20 transition-all duration-300"
                  >
                    View Services
                  </button>
                </div>

                <div className="mt-6 w-full max-w-xl ">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") handleSearch();
                      }}
                      placeholder="Search services..."
                      className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all duration-300"
                    />
                    <button
                      onClick={handleSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-primary to-purple-600  text-white rounded-full font-semibold text-sm transition-all duration-300"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
