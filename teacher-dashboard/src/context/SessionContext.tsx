"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

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
  const [teacherName, setTeacherNameState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("teacherName") || "";
    }
    return "";
  });

  const [sessionId, setSessionIdState] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sessionId");
      return stored ? parseInt(stored, 10) : 1;
    }
    return 1;
  });

  const setTeacherName = (name: string) => {
    setTeacherNameState(name);
    localStorage.setItem("teacherName", name);
  };

  const setSessionId = (id: number) => {
    setSessionIdState(id);
    localStorage.setItem("sessionId", id.toString());
  };

  // Sync with localStorage on first load (optional safety)
  useEffect(() => {
    const storedName = localStorage.getItem("teacherName");
    const storedSession = localStorage.getItem("sessionId");

    if (storedName) setTeacherNameState(storedName);
    if (storedSession) setSessionIdState(parseInt(storedSession, 10));
  }, []);

  return (
    <SessionContext.Provider
      value={{ teacherName, sessionId, setTeacherName, setSessionId }}
    >
      {children}
    </SessionContext.Provider>
  );
};
