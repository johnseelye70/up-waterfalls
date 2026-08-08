import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function seed() {
  const { data: wfs, error: e1 } = await supabase.from('waterfalls').select('id, name').limit(3);
  if (e1 || !wfs || wfs.length < 3) {
    console.error('Error fetching waterfalls:', e1);
    return;
  }

  const blogs = [
    {
      waterfall_id: wfs[0].id,
      title: `The Ultimate Guide to Hiking ${wfs[0].name}`,
      source_site: 'Mitten State Wanderer',
      url: 'https://example.com/hike',
      cover_image_url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
      snippet: 'This is one of the most accessible and beautiful drops in the area. Here is everything you need to know about the trail.',
      published_date: '2025-05-12'
    },
    {
      waterfall_id: wfs[1].id,
      title: `Exploring the Backcountry at ${wfs[1].name}`,
      source_site: 'Pure Michigan Logs',
      url: 'https://example.com/backcountry',
      cover_image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      snippet: 'Hiking the basin loop takes you past this towering waterfall before hitting the trail end.',
      published_date: '2024-09-21'
    },
    {
      waterfall_id: wfs[2].id,
      title: `Why ${wfs[2].name} is the best Waterfall in the North`,
      source_site: 'Awesome Mitten',
      url: 'https://example.com/best-waterfall',
      cover_image_url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=600&q=80',
      snippet: 'Discover the science behind the unique copper-brown color of this fall and why it is a must-visit in every season.',
      published_date: '2023-11-04'
    }
  ];

  const { data, error } = await supabase.from('waterfall_blogs').insert(blogs);
  console.log('Insert complete:', error || 'Success!');
}

seed();
