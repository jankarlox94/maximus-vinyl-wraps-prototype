import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Make sure this points to your initialized Supabase client

// The ONLY 3 people allowed in the dashboard
const ALLOWED_EMAILS = [
  "giancarlo.sanchez.developer@gmail.com",
  "giancarlosanchez.dev@icloud.com",
  "jank_329@hotmail.com",
  "jfa336@hotmail.com",
  "joflorez@utp.edu.co",
];

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Get the current user session from Supabase
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      // 2. Check if their email is exactly one of the 3 allowed emails
      const userEmail = session.user.email;
      if (ALLOWED_EMAILS.includes(userEmail)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Show a loading screen while Supabase verifies the session
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-bold tracking-widest uppercase">
        Verifying Credentials...
      </div>
    );
  }

  // If they aren't authorized, immediately kick them to a login page or home page
  if (!isAuthorized) {
    return <Navigate to="/admin-login" replace />;
  }

  // If they pass the check, render the Dashboard!
  return children;
};

export default ProtectedRoute;
