// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Retrieve the environment variables
// Use process.env.REACT_APP_... if you are using Create React App instead of Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
