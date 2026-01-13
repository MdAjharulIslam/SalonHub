import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  login: boolean;
  setLogin: (value: boolean) => void;
  showLogin: boolean;
  setShowLogin: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const [login, setLogin] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  const value: AppContextType = {
    login,
    setLogin,
    showLogin,
    setShowLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
