import React, { useState, useEffect, useCallback } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";
import banner6 from "../assets/banner6.png";

const slides = [
  {
    id: 1,
    img: banner1,
    tag: "New Collection 2026",
    title: "Luxury",
    titleItalic: "Hair",
    titleEnd: "Artistry",
    subtitle: "Expert stylists crafting your perfect look with precision and care.",
    meta: "✨ Premium Services",
  },
  {
    id: 2,
    img: banner2,
    tag: "Signature Ritual",
    title: "Pampering",
    titleItalic: "Spa",
    titleEnd: "Retreat",
    subtitle: "Relax, refresh, and rejuvenate your body and mind.",
    meta: "🌸 Wellness Journey",
  },
  {
    id: 3,
    img: banner3,
    tag: "Bridal Special",
    title: "Bridal &",
    titleItalic: "Event",
    titleEnd: "Looks",
    subtitle: "Look breathtaking on every special day.",
    meta: "💍 Wedding Season",
  },
  {
    id: 4,
    img: banner4,
    tag: "Color Studio",
    title: "Vivid",
    titleItalic: "Color",
    titleEnd: "& Highlights",
    subtitle: "Premium hair color with long-lasting shine.",
    meta: "🎨 Artistic Expression",
  },
  {
    id: 5,
    img: banner5,
    tag: "Nail Bar",
    title: "Elegant",
    titleItalic: "Nail",
    titleEnd: "Studio",
    subtitle: "Flawless manicure & pedicure experience.",
    meta: "💅 Perfect Details",
  },
  {
    id: 6,
    img: banner6,
    tag: "Glow Ritual",
    title: "Radiant",
    titleItalic: "Skin",
    titleEnd: "Treatments",
    subtitle: "Reveal your most luminous skin ever.",
    meta: "✨ Natural Radiance",
  },
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [animating, setAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const goTo = useCallback((n: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((n + slides.length) % slides.length);
    setTimeout(() => setAnimating(false), 500);
  }, [animating]);

  useEffect(() => {
    if (isHovering) return;
    const t = setInterval(() => goTo(current + 1), 3000);
    return () => clearInterval(t);
  }, [current, goTo, isHovering]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/services?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const slide = slides[current];

  return (
    <div 
      className="w-full px-4 md:px-8 pt-6 pb-12"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
     
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

    
      <div className="relative h-[620px] rounded-3xl overflow-hidden shadow-2xl group">

       
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              i === current ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
            style={{ 
              backgroundImage: `url(${s.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        
        <div className="relative z-10 h-full flex items-center">
          <div className="ml-6 md:ml-16 max-w-xl">
            
         
            <div className="overflow-hidden mb-4">
              <span className="inline-block animate-slide-down text-xs uppercase tracking-[0.2em] text-white/70 font-medium bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full">
                {slide.tag}
              </span>
            </div>

           
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-white/50 text-sm">
                <span className="w-8 h-px bg-gradient-to-r from-primary to-purple-500" />
                {slide.meta}
              </span>
            </div>

            
            <h1 className="text-6xl md:text-7xl font-light text-white leading-[1.1] mb-6">
              {slide.title}{" "}
              <span className="bg-gradient-to-r from-primary via-purple-400 to-purple-600 bg-clip-text text-transparent font-bold italic">
                {slide.titleItalic}
              </span>
              <span className="block font-bold tracking-tight mt-1">
                {slide.titleEnd}
              </span>
            </h1>

           
            <p className="text-white/60 mb-8 text-base md:text-lg leading-relaxed max-w-md backdrop-blur-sm">
              {slide.subtitle}
            </p>

            
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={() => navigate("/service")}
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 px-8 py-3.5 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book Now
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                onClick={() => navigate("/service")}
                className="group border border-white/30 px-8 py-3.5 rounded-full text-white font-medium backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Explore Services
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>

            
            <div className="flex bg-white/10 backdrop-blur-xl rounded-full overflow-hidden border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center pl-5 text-white/50">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for services, treatments..."
                className="flex-1 bg-transparent px-4 py-3.5 text-white placeholder-white/50 outline-none text-sm"
              />
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-primary to-purple-600 px-6 text-white text-sm font-medium hover:opacity-90 transition-all duration-300"
              >
                Search
              </button>
            </div>

            
            <div className="flex items-center gap-6 mt-8 text-white/40 text-xs">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Expert Stylists
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Premium Products
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                5-Star Experience
              </span>
            </div>
          </div>
        </div>

       
        <button
          onClick={() => goTo(current - 1)}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => goTo(current + 1)}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

       
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-8 h-2 bg-gradient-to-r from-primary to-purple-500"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <div 
            className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-5000 ease-linear"
            style={{ width: `${((current + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out forwards;
        }
        .duration-5000 {
          transition-duration: 5000ms;
        }
      `}</style>
    </div>
  );
};

export default Hero;