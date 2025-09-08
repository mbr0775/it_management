// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://apovbnmszzeclydfhogt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwb3Zibm1zenplY2x5ZGZob2d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMjc4NzIsImV4cCI6MjA3MTkwMzg3Mn0.UcBifidrOL4Zc7Uoevxcrw3zxwZg-R3Lj9M2Fz84gnk';

export const supabase = createClient(supabaseUrl, supabaseKey);