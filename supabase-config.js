const SUPABASE_URL = "https://uqgmhjklaiyghpmkutrk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxZ21oamtsYWl5Z2hwbWt1dHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1Njg5ODIsImV4cCI6MjA5NDE0NDk4Mn0.f2PYhzH7Qor3nU9Mi3uNdzbFhjJkcsl94rctamCUh4s";

window.supabaseClient = null;

if (window.supabase && typeof window.supabase.createClient === "function") {
  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
} else {
  console.error("Supabase library did not load. Check the CDN script in index.html.");
}
