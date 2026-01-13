import React from "react";
import { assets } from "../assets/assets";

const About: React.FC = () => {
  return (
    <section className="bg-gray-300 text-gray-800 py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-40 items-center">

        
        <div className="flex justify-center md:justify-end">
          <img
            src={assets.logo} 
            alt="About SalonHub"
            className="rounded-3xl shadow-xl w-full max-w-md object-cover hover:scale-110 transition-all"
          />
        </div>

        
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            About <span className="text-primary">SalonHub</span>
          </h2>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            SalonHub is your ultimate platform for booking beauty and wellness services with ease. We connect you to top-rated salons, professional stylists, and exclusive offers. Experience hassle-free appointments, manage your beauty routine, and stay updated with the latest trends—all in one place.
          </p>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            Our mission is to simplify beauty service booking while delivering a premium experience. From hair styling to spa treatments, we ensure quality, convenience, and satisfaction every step of the way.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium shadow-md">
              Hair Styling
            </span>
            <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium shadow-md">
              Makeup
            </span>
            <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium shadow-md">
              Facial Care
            </span>
            <span className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium shadow-md">
              Spa & Massage
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
