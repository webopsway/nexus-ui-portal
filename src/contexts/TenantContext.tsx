import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Tenant {
  organizationId: string | null;
  organizationName: string | null;
  teamId: string | null;
  teamName: string | null;
}

interface TenantContextType extends Tenant {
  setOrganization: (id: string, name: string) => void;
  setTeam: (id: string, name: string) => void;
  clearTenant: () => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider = ({ children }: { children: ReactNode }) => {
  const [tenant, setTenant] = useState<Tenant>({
    organizationId: null,
    organizationName: null,
    teamId: null,
    teamName: null,
  });

  const setOrganization = (id: string, name: string) => {
    setTenant(prev => ({ ...prev, organizationId: id, organizationName: name }));
  };

  const setTeam = (id: string, name: string) => {
    setTenant(prev => ({ ...prev, teamId: id, teamName: name }));
  };

  const clearTenant = () => {
    setTenant({
      organizationId: null,
      organizationName: null,
      teamId: null,
      teamName: null,
    });
  };

  return (
    <TenantContext.Provider value={{ ...tenant, setOrganization, setTeam, clearTenant }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
};
