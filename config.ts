
export const CONFIG = {
  // ==========================================
  // 1. GOOGLE MAPS PLATFORM
  // Enable: Maps JS API, Places API, Directions API, Distance Matrix API
  // Console: https://console.cloud.google.com/google/maps-apis
  // ==========================================
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAzyTbEutPdMN-962xPIZTX4FLePM1NRaY',

  // ==========================================
  // 2. SUPABASE (Database & Auth)
  // Project Settings -> API
  // Console: https://supabase.com/dashboard/project/_/settings/api
  // ==========================================
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || 'https://jndlmfxjaujjmksbacaz.supabase.co',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuZGxtZnhqYXVqam1rc2JhY2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyMTA5OTAsImV4cCI6MjA4Mzc4Njk5MH0.6I6QOI5ub_B4_gPFPYDzn76DpTnurB3f3ZWz2aJhx7w',

  // ==========================================
  // 3. TWILIO (SMS & OTP)
  // HANDLED BY SUPABASE BACKEND
  // ==========================================

  // ==========================================
  // 4. ONESIGNAL (Push Notifications)
  // Console: https://dashboard.onesignal.com/apps
  // ==========================================
  ONESIGNAL_APP_ID: import.meta.env.VITE_ONESIGNAL_APP_ID || 'e7711f6b-5402-4aea-b699-e3a312307cde',
};

