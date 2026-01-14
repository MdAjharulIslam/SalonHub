// src/components/MapBranch.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { branches,  } from "../assets/assets"; 
import L from "leaflet";
import Title from "./Title";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const MapBranch: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Title title='Find Us' subTitle="See our SalonHub branches in different cities" />

     
      <div className="h-[600px] w-full rounded- shadow-lg ">
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={6}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {branches.map((branch) => (
            <Marker key={branch.id} position={[branch.lat, branch.lng]}>
              <Popup>
                <strong>{branch.name}</strong>
                <br />
                {branch.address}
                <br />
                <em>{branch.city}</em>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapBranch;
