const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://nucgskdkumlpldrkxxye.supabase.co', 'sb_publishable_ixyzKq96XXpktJIU_6Jsrw_bgs3del-');

async function test() {
  const { data: falls } = await supabase.from('waterfalls').select('id, name').limit(1);
  if (falls && falls.length) {
    const wfId = falls[0].id;
    console.log("Found waterfall:", falls[0].name);
    
    // Test update
    const res = await supabase.from('waterfall_photos').update({ is_hero: false }).eq('waterfall_id', wfId).select();
    console.log("UPDATE RES:", JSON.stringify(res, null, 2));
  } else {
    console.log("Waterfall not found");
  }
}
test();
