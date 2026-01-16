import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";


axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:4000";

/* ---------- TYPES ---------- */
export interface ServiceType {
  _id: string;
  name: string;
  price: number;
  category: string;
  duration: string;
  image: string;
  isAvailable: boolean;
  description: string;
}

/* ---------- CONTEXT TYPE ---------- */
interface AppContextType {
  // auth / ui
  login: boolean;
  setLogin: (value: boolean) => void;
  showLogin: boolean;
  setShowLogin: (value: boolean) => void;
  search: string;
  setSearch: (value: string) => void;
  token: string | null;
  setToken: (value: string | null) => void;

  // services
  allService: ServiceType[];
setAllService: React.Dispatch<React.SetStateAction<ServiceType[]>>;
  loading: boolean;
}

/* ---------- CONTEXT ---------- */
const AppContext = createContext<AppContextType | undefined>(undefined);

/* ---------- PROVIDER ---------- */
export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  // auth / ui
  const [login, setLogin] = useState<boolean>(!!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // services
  const [allService, setAllService] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /* ---------- FETCH SERVICES ---------- */
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/service/getAllService");

      

        if (data.success) {
          setAllService(data.allService || []);
        } else {
          toast.error("Failed to load services");
        }
      } catch (err) {
        console.error("Context fetch error:", err);
        toast.error("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <AppContext.Provider
      value={{
        login,
        setLogin,
        showLogin,
        setShowLogin,
        search,
        setSearch,
        token,
        setToken,
        allService,
        setAllService,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/* ---------- HOOK ---------- */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return context;
};
