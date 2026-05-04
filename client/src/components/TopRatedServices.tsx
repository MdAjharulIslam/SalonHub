import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import ServiceCard from "./ServiceCard";
import { useAppContext } from "../context/AppContext";

const TopRatedServices: React.FC = () => {
  console.log("TopRatedServices rendered");

  const { allService, loading } = useAppContext();
  const [visibleServices, setVisibleServices] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleServices(2);
      } else if (window.innerWidth < 768) {
        setVisibleServices(2);
      } else if (window.innerWidth < 1024) {
        setVisibleServices(3);
      } else {
        setVisibleServices(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="max-w-full mx-auto px-6 py-20 md:px-24">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
          <p className="mt-4 text-gray-500">Loading top services...</p>
        </div>
      </div>
    );
  }

  const topServices = allService
    .filter((service) => service.isAvailable)
    .slice(0, visibleServices);

  if (topServices.length === 0) return null;

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-24 py-16 bg-gradient-to-b from-white via-purple-50/20 to-white">
      <div className="relative">
        <div className="absolute top-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl -z-10" />

        <Title
          title="Top Rated Services"
          subTitle="Discover our most loved and requested treatments"
          gradient={true}
          gradientStyle="primary"
        />

        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-600/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Trending This Week
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8">
        {topServices.map((service, index) => (
          <Link
            key={service._id}
            to={`/service/${service._id}`}
            className="group animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl group-hover:blur-2xl" />

              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                {index === 0 && (
                  <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Top Rated
                  </div>
                )}

                {index > 0 && index < 3 && (
                  <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-primary to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Popular
                  </div>
                )}

                <ServiceCard {...service} />
              </div>
            </div>
          </Link> 
        ))}
      </div>

      {/* View All Button */}
      {allService.filter((s) => s.isAvailable).length > visibleServices && (
        <div className="flex justify-center mt-12">
          <Link
            to="/service"
            className="group relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 px-8 py-3 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All Services
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default TopRatedServices;
