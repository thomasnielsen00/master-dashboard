"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SessionContextProps {
  teacherName: string;
  sessionId: number;
  setTeacherName: (name: string) => void;
  setSessionId: (id: number) => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
};

interface ProviderProps {
  children: ReactNode;
}

export const SessionProvider = ({ children }: ProviderProps) => {
  const [teacherName, setTeacherName] = useState("Thomas");
  const [sessionId, setSessionId] = useState(1);
  //can change session id for different scenarios in the testing.
  //  potentially add buttons in the front page to change session

  return (
    <SessionContext.Provider
      value={{ teacherName, sessionId, setTeacherName, setSessionId }}
    >
      {children}
    </SessionContext.Provider>
  );
};
