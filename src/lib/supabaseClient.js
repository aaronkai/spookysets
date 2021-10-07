import { createClient } from '@supabase/supabase-js';

const supabaseURL = 'https://lmbuhysnnyrgctdzjxgs.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzU0OTMxOCwiZXhwIjoxOTQ5MTI1MzE4fQ.y8mRZXl5lzq0jayl63_ud72PT0snGZ4oldqoEMspwVc';

export const supabase = createClient(supabaseURL, supabaseAnonKey);
