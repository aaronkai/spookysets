import { createClient } from '@supabase/supabase-js';

const supabaseURL = 'https://aamvsdijdvgbgtivzqko.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDYxMDAzOCwiZXhwIjoxOTQ2MTg2MDM4fQ.hrknMZ1rxdROBfXvgjo_nQb_LDkDRSfkjGoPWoUZznU';

export const supabase = createClient(supabaseURL, supabaseAnonKey);
