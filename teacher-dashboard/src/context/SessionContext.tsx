"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
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
  const [teacherName, setTeacherName] = useState<string>(""); // initial dummy values
  const [sessionId, setSessionId] = useState<number>(1);
  const [isHydrated, setIsHydrated] = useState(false); // wait until client

  // Read localStorage on client only
  useEffect(() => {
    const storedName = localStorage.getItem("teacherName");
    const storedSession = localStorage.getItem("sessionId");

    if (storedName) setTeacherName(storedName);
    if (storedSession) setSessionId(parseInt(storedSession, 10));
    setIsHydrated(true);
  }, []);

  // Set localStorage when values update
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("teacherName", teacherName);
      localStorage.setItem("sessionId", sessionId.toString());
    }
  }, [teacherName, sessionId, isHydrated]);

  if (!isHydrated) return null;

  return (
    <SessionContext.Provider
      value={{ teacherName, sessionId, setTeacherName, setSessionId }}
    >
      {children}
    </SessionContext.Provider>
  );
};
