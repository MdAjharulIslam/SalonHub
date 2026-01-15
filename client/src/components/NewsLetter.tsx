import React, { useState } from "react";
import { Mail, Check, ArrowRight, Shield, Star } from "lucide-react";

const NewsLetter:React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#E5E7EB] py-24 px-4  ">
      <div className="max-w-6xl mx-auto">

        
        <div className="bg-gray-100 border border-gray-200 rounded-3xl shadow-lg p-8 sm:p-12 lg:p-16">
          <div className="grid md:grid-cols-2 gap-14 items-center">

           
            <div className="space-y-6">
              <span className="inline-flex items-center text-xs font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-primary to-purple-600 px-4 py-1.5 rounded-full">
                Newsletter
              </span>

              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-snug">
                Stay informed with
                <span className="block text-primary-dull mt-1">
                  SalonHub <span className="text-purple-600">insights</span> 
                </span>
              </h2>

              <p className="text-gray-600 max-w-md leading-relaxed">
                Professional salon tips, platform updates, and exclusive offers —
                thoughtfully curated and delivered to your inbox.
              </p>

              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Industry-proven salon strategies</li>
                <li>• Members-only promotions</li>
                <li>• Early access to new features</li>
              </ul>
            </div>

            
            <div>
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">

                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="flex items-center rounded-xl border border-gray-300 bg-gray-50 focus-within:border-primary">
                    <Mail className="w-5 h-5 text-gray-400 ml-4" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@salonhub.com"
                      className="w-full bg-transparent px-4 py-3 text-sm text-gray-800 placeholder-gray-500 outline-none"
                    />
                  </div>
                </div>

                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className="w-full bg-gradient-to-r from-primary to-purple-600 disabled:bg-primary text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Subscribed
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

               
                <p className="text-xs text-gray-500 text-center">
                  We respect your inbox. Unsubscribe anytime.
                </p>

                
                <div className="flex justify-center items-center gap-8 pt-2 text-gray-600">
                  <div className="text-center">
                    <p className="text-sm font-medium">15k+</p>
                    <p className="text-xs text-gray-500">Subscribers</p>
                  </div>

                  <div className="w-px h-8 bg-gray-300" />

                  <div className="text-center flex flex-col items-center">
                    <Star className="w-4 h-4 text-primary-dull" />
                    <p className="text-xs text-gray-500">4.9 rating</p>
                  </div>
                </div>
              </div>

             
              <p className="mt-4 text-xs text-gray-600 flex justify-center items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Your information is secure with SalonHub
              </p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewsLetter;
