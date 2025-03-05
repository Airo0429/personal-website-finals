import { createClient } from '@supabase/supabase-js'

export const supabase = createClient('https://mvyigjzqdlgaxprdjpfu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12eWlnanpxZGxnYXhwcmRqcGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNDA1NTUsImV4cCI6MjA1NjcxNjU1NX0.OzAQK6l8Hoxv8aMRawzdCT5F-hk9N_Qo0NoPHdgf4Ds')