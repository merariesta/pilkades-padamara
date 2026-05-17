/**
 * =========================================
 * SUPABASE CLIENT CONFIGURATION
 * Password database supabase pilkades project Pilkades@2026Secure
 * =========================================
 */

const SUPABASE_URL = 'https://xnsbvdqkserkiipycxsj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhuc2J2ZHFrc2Vya2lpcHljeHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5MjU4OTgsImV4cCI6MjA5NDUwMTg5OH0.yzX0iQvvBF1kaa1BQ960xuA9G-v7uINlCIPLpV3pyis';

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);