import React, { createContext, useState } from "react";

// This is the actual context you'll consume in components
export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCaptain = (captainData) => {
    setCaptain(captainData); // 🔧 FIXED: was setCaptainName()
  };

  const value = {
    captain,
    setCaptain,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateCaptain,
  };

  return (
    <CaptainDataContext.Provider value={value}> {/* 🔧 FIXED: removed extra {} */}
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
