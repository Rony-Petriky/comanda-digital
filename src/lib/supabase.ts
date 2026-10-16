import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Evita quebre se as variáveis ainda não estiverem configuradas
export const supabase = createClient(supabaseUrl, supabaseAnonKey);