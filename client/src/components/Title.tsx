import React from "react";

interface TitleProps {
  title: string;
  subTitle: string;
  centered?: boolean;
  
}

const Title: React.FC<TitleProps> = ({ 
  title, 
  subTitle, 
  centered = true,
  
}) => {
  return (
    <div className={`px-4 pb-12 ${centered ? "text-center" : ""}`}>
    
      <div className={`flex ${centered ? "justify-center" : "justify-start"} mb-4`}>
        <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
      </div>

    
      <h2 className={`
        text-3xl sm:text-4xl md:text-5xl font-bold mb-4
        ${gradient 
          ? "bg-gradient-to-r from-primary via-purple-500 to-purple-600 bg-clip-text text-transparent" 
          : "text-gray-900"
        }
      `}>
        {title}
      </h2>

      
      <p className={`text-base sm:text-lg text-gray-500 max-w-2xl ${centered ? "mx-auto" : ""}`}>
        {subTitle}
      </p>
    </div>
  );
};

export default Title;