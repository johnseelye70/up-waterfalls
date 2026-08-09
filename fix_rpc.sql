-- Secure RPC for setting waterfall primary (FIXED COLUMN REFERENCE)
CREATE OR REPLACE FUNCTION admin_set_waterfall_primary(p_secret text, p_waterfall_id uuid, p_photo_id uuid)
RETURNS void AS $$
DECLARE
  s_key text;
BEGIN
  -- Verify the provided secret matches the master key stored in system_settings
  SELECT setting_value INTO s_key FROM system_settings WHERE setting_name = 'service_role_key' LIMIT 1;
  IF s_key != p_secret THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  UPDATE waterfall_photos SET is_hero = false WHERE waterfall_id = p_waterfall_id;
  UPDATE waterfall_photos SET is_hero = true WHERE id = p_photo_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Secure RPC for setting county primary (FIXED COLUMN REFERENCE)
CREATE OR REPLACE FUNCTION admin_set_county_primary(p_secret text, p_county text, p_photo_id uuid)
RETURNS void AS $$
DECLARE
  s_key text;
BEGIN
  -- Verify the provided secret matches the master key stored in system_settings
  SELECT setting_value INTO s_key FROM system_settings WHERE setting_name = 'service_role_key' LIMIT 1;
  IF s_key != p_secret THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Unset county hero for all waterfalls in this county
  UPDATE waterfall_photos 
  SET is_county_hero = false 
  WHERE waterfall_id IN (SELECT id FROM waterfalls WHERE county = p_county);

  -- Set the new county hero
  UPDATE waterfall_photos SET is_county_hero = true WHERE id = p_photo_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
