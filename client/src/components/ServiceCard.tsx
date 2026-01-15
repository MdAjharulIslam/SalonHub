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
          rounded-3xl
          overflow-hidden
          bg-white
          border border-gray-200
          shadow-md
          hover:shadow-2xl
          hover:-translate-y-1
          transition-all duration-300
        "
      >
        
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="h-64 w-full object-cover"
          />

        
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          
          <span className="absolute bottom-4 left-4 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-primary to-purple-600 text-white rounded-full backdrop-blur-sm">
            {category}
          </span>

         
          <span
            className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full text-white shadow-sm
              ${
                isAvailable
                  ? "bg-green-500"
                  : "bg-red-600"
              }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>

        
        <div className="p-5 space-y-3">
          <h3 className="text-xl font-bold text-gray-900">
            {name}
          </h3>

          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-1 text-gray-600">
              ⏱ {duration} hr
            </span>
            <span className="text-lg font-bold text-primary">
              ৳ {price}
            </span>
          </div>

          
          <button
            disabled={!isAvailable}
            className={`w-full mt-3 py-2 rounded-xl text-sm font-semibold transition
              ${
                isAvailable
                  ? "bg-gradient-to-r from-primary to-purple-600 hover:bg-primary-dull text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            {isAvailable ? "Book Now" : "Currently Unavailable"}
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
