import { createContext, useContext } from "react";

// Create the context
const UserInfosContext = createContext();

// Create a provider component
export const UserInfosProvider = ({ children, userInfos }) => {
  return (
    <UserInfosContext.Provider value={userInfos}>
      {children}
    </UserInfosContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUserInfos = () => {
  return useContext(UserInfosContext);
};
