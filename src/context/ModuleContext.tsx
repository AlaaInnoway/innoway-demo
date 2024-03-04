import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ModuleContextProps {
  children: ReactNode;
}

export const ModuleContext = createContext<{
  selectedModule: string | null;
  setSelectedModule: React.Dispatch<React.SetStateAction<string | null>>;
} | undefined>(undefined);

export const ModuleProvider: React.FC<ModuleContextProps> = ({ children }) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(
    localStorage.getItem('module') || 'home'
  );

  return (
    <ModuleContext.Provider value={{ selectedModule, setSelectedModule }}>
      {children}
    </ModuleContext.Provider>
  );
};

export const useModuleContext = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error('useModuleContext must be used within a ModuleProvider');
  }
  return context;
};
