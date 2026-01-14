
export const CONFIG = {
  // ==========================================
  // 1. GOOGLE MAPS PLATFORM
  // Enable: Maps JS API, Places API, Directions API, Distance Matrix API
  // Console: https://console.cloud.google.com/google/maps-apis
  // ==========================================
  GOOGLE_MAPS_API_KEY: "YOUR_GOOGLE_MAPS_API_KEY_HERE",

  // ==========================================
  // 2. SUPABASE (Database & Auth)
  // Project Settings -> API
  // Console: https://supabase.com/dashboard/project/_/settings/api
  // ==========================================
  SUPABASE_URL: "https://jndlmfxjaujjmksbacaz.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuZGxtZnhqYXVqam1rc2JhY2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMTA5OTAsImV4cCI6MjA4Mzc4Njk5MH0.6I6QOI5ub_B4_gPFPYDzn76DpTnurB3f3ZWz2aJhx7w",

  // ==========================================
  // 3. TWILIO (SMS & OTP)
  // Console: https://console.twilio.com/
  // Note: For security, Twilio calls should ideally happen on your backend 
  // or via a Supabase Edge Function to protect the Auth Token.
  // ==========================================
  TWILIO_ACCOUNT_SID: "YOUR_TWILIO_ACCOUNT_SID_HERE",
  TWILIO_AUTH_TOKEN: "YOUR_TWILIO_AUTH_TOKEN_HERE",
  TWILIO_SERVICE_SID: "YOUR_TWILIO_VERIFY_SERVICE_SID_HERE", 

  // ==========================================
  // 4. ONESIGNAL (Push Notifications)
  // Console: https://dashboard.onesignal.com/apps
  // ==========================================
  ONESIGNAL_APP_ID: "YOUR_ONESIGNAL_APP_ID_HERE",
};
