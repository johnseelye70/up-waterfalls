CREATE OR REPLACE FUNCTION admin_delete_photo(p_secret text, p_photo_id uuid)
RETURNS void AS $$
DECLARE
  s_key text;
BEGIN
  -- Verify the provided secret matches the master key stored in system_settings
  SELECT setting_value INTO s_key FROM system_settings WHERE setting_name = 'service_role_key' LIMIT 1;
  IF s_key != p_secret THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Delete the photo record from the database
  DELETE FROM waterfall_photos WHERE id = p_photo_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
