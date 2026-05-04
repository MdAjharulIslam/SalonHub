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

      {/* simple line */}
      <div className={`flex ${centered ? "justify-center" : "justify-start"} mb-4`}>
        <div className="w-12 h-0.5 bg-gray-400 rounded-full" />
      </div>

      {/* title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
        {title}
      </h2>

      {/* subtitle */}
      <p className={`text-base sm:text-lg text-gray-500 max-w-2xl ${centered ? "mx-auto" : ""}`}>
        {subTitle}
      </p>

    </div>
  );
};

export default Title;