"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const phoneNumber = Cookies.get("phoneNumber");
      const sipUsername = Cookies.get("sipUsername");
      if (phoneNumber && sipUsername) {
        setUser({
          phoneNumber,
          sipUsername,
        });
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const login = async (phoneNumber) => {
    try {
      const formattedNumber = phoneNumber.replace(/\+/g, "");

      if (formattedNumber.length < 10) {
        throw new Error("Nomor telepon tidak valid");
      }

      const sipUsername = `sip:${formattedNumber}@your-kamailio-server.com`;

      Cookies.set("phoneNumber", formattedNumber, { expires: 7 });
      Cookies.set("sipUsername", sipUsername, { expires: 7 });

      setUser({
        phoneNumber: formattedNumber,
        sipUsername,
      });

      toast.success("Login berhasil!");
      router.push("/dashboard");
      return true;
    } catch (error) {
      toast.error(error.message || "Login gagal. Silakan coba lagi.");
      return false;
    }
  };

  const logout = () => {
    Cookies.remove("phoneNumber");
    Cookies.remove("sipUsername");
    setUser(null);
    router.push("/login");
    toast.success("Logout berhasil");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
