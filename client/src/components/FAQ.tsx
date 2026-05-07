import React, { useState } from "react";
import Title from "./Title";

const faqs = [
  {
    category: "Services",
    question: "What services do you offer at the salon?",
    answer:
      "We offer luxury hair styling, bridal makeup, spa therapy, manicure, pedicure, facials, and advanced skin treatments by expert professionals.",
  },
  {
    category: "Booking",
    question: "How do I book an appointment?",
    answer:
      "You can easily book through SalonHub by selecting your service, preferred stylist, and available schedule.",
  },
  {
    category: "Bridal",
    question: "Do you offer bridal packages?",
    answer:
      "Yes. Our bridal packages include makeup, hairstyling, skin preparation, nail care, and personalized consultations.",
  },
  {
    category: "Color",
    question: "Are your hair color products safe?",
    answer:
      "Absolutely. We use premium ammonia-free and dermatologist-approved products for long-lasting healthy color.",
  },
  {
    category: "Spa",
    question: "What spa treatments are available?",
    answer:
      "We provide aromatherapy, glow facials, deep cleansing treatments, body massage, and relaxing spa rituals.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-24 py-16 bg-[#E5E7EB] overflow-hidden">
      <div className="relative">
       
        <div className="absolute top-20 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl -z-10" />

        
        <Title
          title="Frequently Asked Questions"
          subTitle="Everything you need to know before booking your beauty & wellness experience"
          centered={true}
        />

        
        <div className="max-w-4xl mx-auto mt-12 space-y-5">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 ${
                  isOpen
                    ? "border-primary/20 bg-white shadow-2xl shadow-primary/10"
                    : "border-gray-100 bg-white hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-primary/[0.03] via-purple-500/[0.03] to-pink-500/[0.03]" />

                
                <button
                  onClick={() => toggle(i)}
                  className="relative w-full flex items-center justify-between gap-5 px-6 sm:px-8 py-6 text-left"
                >
                  <div className="flex items-start gap-4 flex-1">
                  
                    <span className="hidden sm:flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary text-[10px] uppercase tracking-[0.2em] font-semibold border border-primary/10 whitespace-nowrap">
                      {faq.category}
                    </span>

                    <div>
                      <h3
                        className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${
                          isOpen
                            ? "text-gray-900"
                            : "text-gray-700 group-hover:text-primary"
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl font-light transition-all duration-500 ${
                      isOpen
                        ? "rotate-45 bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"
                    }`}
                  >
                    +
                  </div>
                </button>

              
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-8 pb-7">
                      <div className="h-px w-full bg-gradient-to-r from-primary/20 via-purple-500/20 to-transparent mb-5" />

                      <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
};

export default FAQ;