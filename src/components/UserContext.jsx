import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from("users_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!error) setProfile(data);
      }
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, setProfile }}>
      {children}
    </UserContext.Provider>
  );
};
