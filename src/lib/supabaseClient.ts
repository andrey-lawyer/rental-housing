import { createClient } from '@supabase/supabase-js'


const supabaseUrl:string = import.meta.env.VITE_PROJECT_NAME_SUPABASE;
const supabaseKey:string = import.meta.env.VITE_KEY_SUPABASE;
export const supabase = createClient(supabaseUrl, supabaseKey);

