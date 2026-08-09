CREATE OR REPLACE FUNCTION admin_update_passcode(p_secret text, p_new_hash text)
RETURNS void AS $$
DECLARE
  s_key text;
BEGIN
  -- Verify the provided secret matches the master key stored in system_settings
  SELECT setting_value INTO s_key FROM system_settings WHERE setting_name = 'service_role_key' LIMIT 1;
  IF s_key != p_secret THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  UPDATE system_settings 
  SET setting_value = p_new_hash 
  WHERE setting_name = 'admin_passcode_hash';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
