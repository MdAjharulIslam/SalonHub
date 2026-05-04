
import React from "react";

interface TitleProps {
  title: string;
  subTitle: string;
  centered?: boolean;
  gradient?: boolean;
  gradientStyle?: "primary" | "rainbow" | "sunset" | "ocean";
}

const Title: React.FC<TitleProps> = ({ 
  title, 
  subTitle, 
  centered = true,
  gradient = false,
  gradientStyle = "primary"
}) => {
  const getGradientClass = () => {
    switch (gradientStyle) {
      case "rainbow":
        return "from-red-500 via-purple-500 to-blue-500";
      case "sunset":
        return "from-orange-500 via-pink-500 to-purple-600";
      case "ocean":
        return "from-cyan-500 via-blue-500 to-purple-600";
      default:
        return "from-primary via-purple-500 to-purple-600";
    }
  };

  const getLineGradient = () => {
    switch (gradientStyle) {
      case "rainbow":
        return "from-red-400 via-purple-400 to-blue-400";
      case "sunset":
        return "from-orange-400 via-pink-400 to-purple-500";
      case "ocean":
        return "from-cyan-400 via-blue-400 to-purple-500";
      default:
        return "from-primary via-purple-500 to-purple-600";
    }
  };

  return (
    <div className={`px-4 pb-12 ${centered ? "text-center" : ""}`}>
      {/* Decorative Line */}
      <div className={`flex ${centered ? "justify-center" : "justify-start"} mb-4`}>
        <div className={`w-12 h-0.5 bg-gradient-to-r ${getLineGradient()} rounded-full`} />
      </div>

      {/* Title */}
      <h2 className={`
        text-3xl sm:text-4xl md:text-5xl font-bold mb-4
        ${gradient 
          ? `bg-gradient-to-r ${getGradientClass()} bg-clip-text text-transparent` 
          : "text-gray-900"
        }
      `}>
        {title}
      </h2>

      {/* Subtitle */}
      <p className={`text-base sm:text-lg text-gray-500 max-w-2xl ${centered ? "mx-auto" : ""}`}>
        {subTitle}
      </p>
    </div>
  );
};

export default Title;