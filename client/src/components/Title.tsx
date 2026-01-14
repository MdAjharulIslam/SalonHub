import React from "react";

interface TitleProps {
  title: string;
  subTitle: string;
}

const Title: React.FC<TitleProps> = ({ title, subTitle }) => {
  return (
    <div className="text-center px-4 pb-10 space-y-3">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
        {title}
      </h2>

      <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
        {subTitle}
      </p>

    
      <div className="flex justify-center pt-2">
        <span className="h-1 w-16 rounded-full bg-primary/90" />
      </div>
    </div>
  );
};

export default Title;
