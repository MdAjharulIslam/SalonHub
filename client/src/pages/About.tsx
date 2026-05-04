import React from "react";
import { assets } from "../assets/assets";

const About: React.FC = () => {
  const features = [
    { icon: "💇", text: "Hair Styling" },
    { icon: "💄", text: "Makeup" },
    { icon: "✨", text: "Facial Care" },
    { icon: "🧘", text: "Spa & Massage" },
  ];

  return (
    <section className="relative bg-gradient-to-b from-gray-50 via-white to-purple-50/30 py-20 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          
          
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary via-purple-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl" />
            <div className="relative bg-white rounded-2xl shadow-2xl p-3">
              <img
                src={assets.logo}
                alt="About SalonHub"
                className="w-full max-w-md mx-auto object-cover rounded-xl"
              />
            </div>
          </div>

          
          <div className="space-y-5">
          
            <div>
              <span className="text-xs uppercase tracking-wider text-primary/80 font-semibold">Our Story</span>
              <h2 className="text-4xl sm:text-5xl font-bold mt-1">
                About{" "}
                <span className="bg-gradient-to-r from-primary via-purple-500 to-purple-600 bg-clip-text text-transparent">
                  SalonHub
                </span>
              </h2>
            </div>

            
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              SalonHub is your ultimate platform for booking beauty and wellness services with ease. 
              We connect you to top-rated salons, professional stylists, and exclusive offers.
            </p>

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              Our mission is to simplify beauty service booking while delivering a premium experience. 
              From hair styling to spa treatments, we ensure quality, convenience, and satisfaction.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 pt-2">
              {features.map((feature, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary rounded-full text-sm font-medium hover:shadow-md hover:scale-105 transition-all duration-300"
                >
                  <span>{feature.icon}</span>
                  {feature.text}
                </span>
              ))}
            </div>

           
            <button className="mt-4 bg-gradient-to-r from-primary to-purple-600 px-6 py-2.5 rounded-full text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              Discover Our Services →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;