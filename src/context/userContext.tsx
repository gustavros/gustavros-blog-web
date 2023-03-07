import React, { createContext, useState } from "react";

interface UserInfoProps {
  jwt: string;
  id: string;
  username: string;
  nivel: string;
}

interface UserContextValue {
  userInfo: UserInfoProps | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoProps | null>>;

  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextValue>({
  userInfo: null,
  setUserInfo: () => {},
  username: "",
  setUsername: () => {},
});

interface UserContextProps {
  children: React.ReactNode;
}

export default function UserContextProvider({ children }: UserContextProps) {
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null);
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        username,
        setUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
