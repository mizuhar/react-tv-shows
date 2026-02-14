
import { createContext, useEffect, useState } from "react";
import { supabase } from "../data/supabaseClient";
import * as authService from "../data/auth";

import { toast } from "react-toastify";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  // 🔥 Sync with Supabase session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
       setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

 const loginSubmitHandler = async ({ email, password }) => {
  if (!email || !password) {
    toast.error("All fields are required!");
    return;
  }

  const loginPromise = authService.login(email, password);

  toast.promise(loginPromise, {
    pending: "Logging in...",
    success: "Welcome back 👋",
    error: "Invalid email or password 😢",
  });

  try {
    await loginPromise;
  } catch (err) {
    // optional ако искаш custom message от Supabase
    console.error(err.message);
  }
};


const registerSubmitHandler = async ({ email, password }) => {
  if (!email || !password) {
    toast.error("All fields are required!");
    return;
  }

  const registerPromise = authService.register(email, password);

  toast.promise(registerPromise, {
    pending: "Creating account...",
    success: "Account created successfully 🎉",
    error: "Registration failed 😢",
  });

  try {
    await registerPromise;
  } catch (err) {
    console.error(err.message);
  }
};


 const logoutHandler = async () => {
  const logoutPromise = authService.logout();

  toast.promise(logoutPromise, {
    pending: "Signing out...",
    success: "Logged out 👋",
    error: "Logout failed 😢",
  });

  try {
    await logoutPromise;
  } catch (err) {
    console.error(err.message);
  }
};


  const context = {
    user,
    loading,
    isAuthenticated: !!user,
    email: user?.email,
    userId: user?.id,
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  );
};

