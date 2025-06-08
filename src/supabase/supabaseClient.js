import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://nmfknrjszceupstbzcby.supabase.co"; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZmtucmpzemNldXBzdGJ6Y2J5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODk1NTAyMywiZXhwIjoyMDY0NTMxMDIzfQ.VIGmxclH7rm2QeGdk6LnBCnRZjckxXpyjekBVYOl4gg'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
