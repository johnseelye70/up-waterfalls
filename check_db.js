import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function check() {
  console.log('Checking waterfalls...');
  const { data: wfs, error: e1 } = await supabase.from('waterfalls').select('id, name').limit(3);
  console.log('Waterfalls:', wfs, e1);

  console.log('Checking blogs...');
  const { data: blogs, error: e2 } = await supabase.from('waterfall_blogs').select('*');
  console.log('Blogs:', blogs, e2);
}

check();
