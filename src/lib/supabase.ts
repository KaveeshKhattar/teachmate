import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://xdztgviyosefotfgcyls.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkenRndml5b3NlZm90ZmdjeWxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTczODU1NiwiZXhwIjoyMDQ3MzE0NTU2fQ.bIvSweK1fWLoRNcHWde-WA9r_nXIMOoqhB1SLxDGybE');
