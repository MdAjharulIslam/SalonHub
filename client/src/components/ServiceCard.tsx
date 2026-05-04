import React from "react";

interface ServiceCardProps {
  name: string;
  price: number;
  category: string;
  duration: string;
  image: string;
  isAvailable: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  price,
  category,
  duration,
  image,
  isAvailable,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="
          w-full max-w-lg
          rounded-2xl
          overflow-hidden
          bg-white
          border border-gray-100
          shadow-md
          hover:shadow-2xl
          hover:-translate-y-1
          transition-all duration-300
        "
      >
        
        <div className="relative group">
          <img
            src={image}
            alt={name}
            className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

         
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

          
          <span className="absolute bottom-3 left-3 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-primary to-purple-600 text-white rounded-full shadow-md">
            {category}
          </span>

        
          <span
            className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full text-white shadow-md backdrop-blur-sm
              ${
                isAvailable
                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                  : "bg-gradient-to-r from-red-500 to-red-600"
              }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
            {name}
          </h3>

          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {duration} {parseFloat(duration) > 1 ? "hrs" : "hr"}
            </span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ৳ {price.toLocaleString()}
            </span>
          </div>

        
          <button
            disabled={!isAvailable}
            className={`w-full mt-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
              ${
                isAvailable
                  ? "bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg hover:scale-[1.02] text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
          >
            {isAvailable ? (
              <span className="flex items-center justify-center gap-2">
                Book Now
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            ) : (
              "Currently Unavailable"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;