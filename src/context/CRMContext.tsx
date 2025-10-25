import React, { createContext, useContext, useState } from "react";

interface CRMContextType {
  contacts: any[];
  setContacts: React.Dispatch<React.SetStateAction<any[]>>;
  deals: any[];
  setDeals: React.Dispatch<React.SetStateAction<any[]>>;
  connectedCRMs: string[];
  setConnectedCRMs: React.Dispatch<React.SetStateAction<string[]>>;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [connectedCRMs, setConnectedCRMs] = useState<string[]>([]);

  return (
    <CRMContext.Provider value={{ contacts, setContacts, deals, setDeals, connectedCRMs, setConnectedCRMs }}>
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) throw new Error("useCRM must be used within a CRMProvider");
  return context;
};
