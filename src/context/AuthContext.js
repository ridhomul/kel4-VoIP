"use client";

import { createContext, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AuthContext = createContext();

const SIP_SERVER_IP = "172.20.10.3";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (phoneNumber, password) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setUser({
        phoneNumber: data.phoneNumber,
        sipUsername: data.sipUsername,
      });

      toast.success("Login berhasil!");
      router.push("/dashboard");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login gagal. Silakan coba lagi.");
      return false;
    }
  };

  const logout = () => {
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
