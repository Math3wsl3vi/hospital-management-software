'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface User {
    id: number;
    name: string;
    unit: string;
    rank: string;
    phone: string;
    sex: string;
    dob: string;
  }

interface UserContextType {
    selectedUser: User | null;
    setSelectedUser: Dispatch<SetStateAction<User | null>>;
  }

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
