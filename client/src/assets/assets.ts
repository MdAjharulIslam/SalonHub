import logo from './logo.png'
import search_icon from './search_icon.svg'
import banner1 from './banner1.png'
import banner2 from './banner2.png'
import banner3 from './banner3.png'
import banner4 from './banner4.png'
import banner5 from './banner5.png'
import banner6 from './banner6.png'
import bridal from './bridal.png'
import facial from './facial.png'
import hair_color from './hair_color.png'
import hair_spa from './hair_spa.png'
import hair_treatment from './hair_treatment.png'
import haircut from './haircut.png'
import makeup from './makeup.png'
import massage from './massage.png'
export const assets = {
    logo,
    search_icon,
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6
}

export const serviceCategories = [
  {
    id: 1,
    name: "Haircut",
    firstName: "Haircut",
    image: haircut,
  },
  {
    id: 2,
    name: "Hair Color",
    firstName: "Hair_color",
    image: hair_color,
  },
  {
    id: 3,
    name: "Hair Treatment",
    firstName: "Hair_Treatment",
    image: hair_treatment,
  },
  {
    id: 4,
    name: "Facial",
    firstName: "Facial",
    image: facial,
  },
 
  {
    id: 5,
    name: "Massage",
    firstName: "Massage",
    image:massage,
  },
  {
    id: 6,
    name: "Makeup",
    firstName: "Makeup",
    image: makeup,
  },
  {
    id: 7,
    name: "Bridal",
    firstName: "Bridal",
    image: bridal,
  },
  {
    id: 8,
    name: "Hair Spa",
    firstName: "spa",
    image: hair_spa,
  },
];


export interface BranchType {
  id: number;
  name: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
}
export const branches: BranchType[] = [
  {
    id: 1,
    name: "SalonHub Downtown",
    city: "Dhaka",
    address: "123 Gulshan Ave, Dhaka",
    lat: 23.8103,
    lng: 90.4125,
  },
  {
    id: 2,
    name: "SalonHub Banani",
    city: "Dhaka",
    address: "45 Banani Rd, Dhaka",
    lat: 23.7945,
    lng: 90.4070,
  },
  {
    id: 3,
    name: "SalonHub Chittagong",
    city: "Chittagong",
    address: "22 Agrabad, Chittagong",
    lat: 22.3569,
    lng: 91.7832,
  },
  {
    id: 4,
    name: "SalonHub Sylhet",
    city: "Sylhet",
    address: "10 Subhanighat Rd, Sylhet",
    lat: 24.8949,
    lng: 91.8687,
  },
  {
    id: 5,
    name: "SalonHub Mymenshingh",
    city: "Mymenshingh",
    address: "Sadar, Mymenshingh",
    lat: 24.7617,
    lng: 90.4066,
  },
  {
    id: 6,
    name: "SalonHub Kishoregonj",
    city: "Kishoregonj",
    address: "Main Rd, Kishoregonj",
    lat: 24.4240,
    lng: 90.7850,
  },
];
