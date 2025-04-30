
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mzuikdkntpvtawwijxpz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16dWlrZGtudHB2dGF3d2lqeHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNTMzMzUsImV4cCI6MjA2MDkyOTMzNX0.ByaRMseDoZiMc0pFbRn-HN03910TRTOeCGnUUHKuBOI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
