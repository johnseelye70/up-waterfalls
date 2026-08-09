-- 1. Create SYSTEM_SETTINGS Table
CREATE TABLE IF NOT EXISTS system_settings (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_name text UNIQUE NOT NULL,
    setting_value text NOT NULL,
    description text
);

-- Deny all access to SYSTEM_SETTINGS from public anon API
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Insert default Admin Passcode Hash 
-- (Default Passcode: "upwaterfalls2026", SHA-256: 052e42426027aefbcda50cbead28bb5a81665a2512f43fb24cb0b2302bb633fa)
INSERT INTO system_settings (setting_name, setting_value, description)
VALUES ('admin_passcode_hash', '052e42426027aefbcda50cbead28bb5a81665a2512f43fb24cb0b2302bb633fa', 'SHA-256 hash of the admin passcode')
ON CONFLICT (setting_name) DO UPDATE SET setting_value = EXCLUDED.setting_value;

-- Note: User will need to manually insert 'service_role_key' into this table via Supabase SQL Editor for security.

-- 2. Create RPC Function to securely fetch settings only if hash matches
CREATE OR REPLACE FUNCTION get_system_settings(p_hash text)
RETURNS json AS $$
DECLARE
  v_stored_hash text;
BEGIN
  -- Get the stored hash
  SELECT setting_value INTO v_stored_hash 
  FROM system_settings 
  WHERE setting_name = 'admin_passcode_hash';

  -- Compare with provided hash
  IF v_stored_hash = p_hash THEN
    -- Return all settings as a JSON object
    RETURN (
      SELECT json_object_agg(setting_name, setting_value) 
      FROM system_settings
    );
  ELSE
    RAISE EXCEPTION 'Invalid passcode.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Create Storage Bucket for Uploads (if not exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('waterfall_uploads', 'waterfall_uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Since the frontend will use the Service Role Key to upload (after unlocking it via the RPC),
-- we do NOT need to create public INSERT policies for the bucket. 
-- The bucket is public for reading (public = true) so images can be displayed.
