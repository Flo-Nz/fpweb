import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyJwt, fetchUserInfos, getUserInfos, logout } from "../lib/auth";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLogged: false,
    userId: null,
    username: null,
    avatar: null,
    discordRoles: [],
  });
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const initAuth = useCallback(async () => {
    try {
      const jwt = searchParams.get("jwt");
      if (jwt) {
        await verifyJwt(jwt);
        setSearchParams("");
      }

      const infos = await getUserInfos();
      if (infos.isLogged) {
        await fetchUserInfos();
        const freshInfos = await getUserInfos();
        setUser({ ...freshInfos, isLogged: true });
      }
    } catch (error) {
      console.error("[Auth] Init failed:", error.message);
    } finally {
      setLoading(false);
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    initAuth();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser({
      isLogged: false,
      userId: null,
      username: null,
      avatar: null,
      discordRoles: [],
    });
  };

  return (
    <UserContext.Provider value={{ user, loading, logout: handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
