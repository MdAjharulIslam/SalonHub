import React from "react";
import { MapContainer, TileLayer, Marker, Popup,  } from "react-leaflet";
import { branches } from "../assets/assets";
import L from "leaflet";
import Title from "./Title";
import { FiMapPin, FiPhone, FiClock, FiNavigation } from "react-icons/fi";
import "leaflet/dist/leaflet.css";

// Fix default icon issue in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const MapBranch: React.FC = () => {
  return (
    <div className="relative bg-[#E5E7EB] py-16 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Title title="Find Us" subTitle="Discover our SalonHub locations across the country" />

        <div className="flex flex-col lg:flex-row gap-8 mt-12">
          <div className="flex-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <MapContainer
                center={[23.8103, 90.4125]}
                zoom={6}
                scrollWheelZoom={true}
                className="h-full w-full z-0"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {branches.map((branch) => (
                  <Marker key={branch.id} position={[branch.lat, branch.lng]}>
                    <Popup>
                      <div className="p-2">
                        <strong className="text-lg text-primary">{branch.name}</strong>
                        <br />
                        <span className="text-gray-600">{branch.address}</span>
                        <br />
                        <em className="text-gray-500">{branch.city}</em>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-2xl">
                  <FiMapPin className="text-primary text-2xl" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                    Welcome to SalonHub!
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Explore our branches across the country and find the one closest to you.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                Book your favorite services directly from our platform and enjoy a seamless experience. 
                Our team of professional stylists and therapists are ready to provide you 
                with top-notch service.
              </p>

              <button className="w-full bg-gradient-to-r from-primary to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                <FiNavigation className="text-xl" />
                Book Appointment Now
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="p-3 bg-green-100 rounded-xl w-fit mb-3">
                  <FiClock className="text-green-600 text-xl" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Open Daily</h3>
                <p className="text-sm text-gray-600">9:00 AM - 9:00 PM</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="p-3 bg-blue-100 rounded-xl w-fit mb-3">
                  <FiPhone className="text-blue-600 text-xl" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">Call Us</h3>
                <p className="text-sm text-gray-600">+880 123-456-789</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-purple-600 p-6 rounded-2xl shadow-xl text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">Total Branches</p>
                  <p className="text-4xl font-bold">{branches.length}+</p>
                </div>
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <FiMapPin className="text-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
            <p className="text-4xl font-bold text-primary mb-2">50K+</p>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
            <p className="text-4xl font-bold text-purple-600 mb-2">100+</p>
            <p className="text-gray-600">Expert Stylists</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
            <p className="text-4xl font-bold text-pink-600 mb-2">25+</p>
            <p className="text-gray-600">Premium Services</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapBranch;
