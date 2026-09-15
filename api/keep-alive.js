// Ensure WebSocket polyfill exists for Node.js environments
if (typeof globalThis.WebSocket === 'undefined') {
  globalThis.WebSocket = class WebSocket {};
}

import { createClient } from '@supabase/supabase-js';

const rawUrl = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '').trim();
const supabaseUrl = rawUrl
  .replace(/\/+$/, '')
  .replace(/\/(rest|storage|auth|realtime|functions)(.*)?$/, '');
const supabaseAnonKey = (process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '').trim();

const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }
    })
  : null;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const timestamp = new Date().toISOString();

  if (!supabase && !supabaseUrl) {
    return res.status(500).json({
      success: false,
      error: 'Supabase credentials not configured in environment',
      timestamp
    });
  }

  try {
    // Perform a live read query against the waterfalls table to produce active database lifecycle activity
    let data = null;
    let error = null;

    if (supabase) {
      const result = await supabase
        .from('waterfalls')
        .select('id, name')
        .limit(1);
      data = result.data;
      error = result.error;
    }

    // Direct REST fallback if client query encountered an error or client was unavailable
    if ((error || !supabase) && supabaseUrl && supabaseAnonKey) {
      const restRes = await fetch(`${supabaseUrl}/rest/v1/waterfalls?select=id,name&limit=1`, {
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`
        }
      });
      if (restRes.ok) {
        data = await restRes.json();
        error = null;
      } else {
        const errText = await restRes.text();
        error = { message: `REST status ${restRes.status}: ${errText}` };
      }
    }

    if (error) {
      console.error('Supabase keep-alive query error:', error);
      return res.status(500).json({
        success: false,
        error: error.message || String(error),
        timestamp
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Supabase database pinged successfully to prevent auto-pause',
      recordsChecked: data ? data.length : 0,
      timestamp
    });
  } catch (err) {
    console.error('Keep-alive handler error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || String(err),
      timestamp
    });
  }
}
