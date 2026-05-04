import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const ContactPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !message) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post("/api/contact", { name, email, phone, message });

      if (data.success) {
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-purple-50/30 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      {/* Floating Decorations */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-primary rounded-full animate-pulse" />
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-150" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full" />
              <span className="text-xs uppercase tracking-wider text-primary/80 font-semibold">Get in Touch</span>
              <div className="w-8 h-0.5 bg-gradient-to-r from-purple-600 to-primary rounded-full" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Contact{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Have a question or need assistance? We're here to help. Reach out to us and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 px-6 py-4">
              <h3 className="text-xl font-semibold text-gray-800">Send us a message</h3>
              <p className="text-sm text-gray-500 mt-1">We'll get back to you within 24 hours</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea
                  placeholder="Tell us how we can help..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative overflow-hidden group w-full bg-gradient-to-r from-primary to-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Address Card */}
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="bg-gradient-to-r from-primary/20 to-purple-600/20 p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md text-2xl">
                    📍
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Our Address</h3>
                    <p className="text-gray-600 text-sm">123 Gulshan Avenue, Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md text-2xl">
                    📞
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600 text-sm">+880 1234 567890</p>
                    <p className="text-gray-400 text-xs mt-1">Mon-Sat, 9AM - 8PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 p-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md text-2xl">
                    ✉️
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600 text-sm">info@salonhub.com</p>
                    <p className="text-gray-400 text-xs mt-1">support@salonhub.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-xl flex items-center justify-center text-xl">
                  🌐
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Follow Us</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>📘</span> Facebook
                  </span>
                </a>
                <a
                  href="#"
                  className="group relative overflow-hidden bg-gradient-to-r from-sky-500 to-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>🐦</span> Twitter
                  </span>
                </a>
                <a
                  href="#"
                  className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>📸</span> Instagram
                  </span>
                </a>
                <a
                  href="#"
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>🔗</span> LinkedIn
                  </span>
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">🕐</div>
                <h3 className="font-semibold text-gray-800">Business Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium text-gray-800">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium text-gray-800">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium text-red-500">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;