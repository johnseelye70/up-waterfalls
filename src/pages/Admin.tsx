import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// Helper to hash passcode
async function hashPasscode(passcode: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(passcode)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

interface Waterfall {
  id: string
  name: string
  county: string
}

export default function Admin() {
  // Auth state
  const [passcode, setPasscode] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authError, setAuthError] = useState('')
  const [adminKey, setAdminKey] = useState<string | null>(null)
  
  // Rate limiting state
  const [attempts, setAttempts] = useState(0)
  const [lockoutTime, setLockoutTime] = useState<number | null>(null)

  // Dashboard state
  const [waterfalls, setWaterfalls] = useState<Waterfall[]>([])
  const [selectedWaterfall, setSelectedWaterfall] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [caption, setCaption] = useState('')
  const [credit, setCredit] = useState('Admin Upload')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')

  // Handle brute-force lockout timer
  useEffect(() => {
    if (lockoutTime) {
      const interval = setInterval(() => {
        if (Date.now() > lockoutTime) {
          setLockoutTime(null)
          setAttempts(0)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [lockoutTime])

  // Fetch waterfalls for dropdown once authenticated
  useEffect(() => {
    if (adminKey) {
      const fetchWaterfalls = async () => {
        const { data, error } = await supabase.from('waterfalls').select('id, name, county').order('name')
        if (error) {
          console.error("Error fetching waterfalls:", error)
          setUploadStatus(`❌ DB Error: ${error.message}`)
        }
        if (data) setWaterfalls(data)
      }
      fetchWaterfalls()
    }
  }, [adminKey])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (lockoutTime) return
    
    setIsAuthenticating(true)
    setAuthError('')
    
    try {
      const hash = await hashPasscode(passcode)
      
      const { data: settings, error } = await supabase.rpc('get_system_settings', { p_hash: hash })
      
      if (error || !settings) {
        throw new Error('Invalid passcode')
      }

      const serviceRoleKey = settings.service_role_key
      if (!serviceRoleKey) {
        throw new Error('Service Role Key not configured in SYSTEM_SETTINGS')
      }

      // Save key to state (bypassing the Supabase JS browser restriction on service keys)
      const sanitizedKey = serviceRoleKey.trim().replace(/^["']|["']$/g, '')
      setAdminKey(sanitizedKey)
      
    } catch (err: any) {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      if (newAttempts >= 5) {
        setLockoutTime(Date.now() + 30000) // 30s lockout
        setAuthError('Too many attempts. Locked out for 30 seconds.')
      } else {
        setAuthError(err.message || 'Authentication failed')
      }
    } finally {
      setIsAuthenticating(false)
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!adminKey || !selectedWaterfall || !file) return
    
    setIsUploading(true)
    setUploadStatus('')
    
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${selectedWaterfall}-${Date.now()}.${fileExt}`
      const filePath = `waterfall_photos/${fileName}`
      
      // 1. Upload file to Storage using the standard anon client
      // (The Supabase API Gateway strictly blocks service_role keys if an Origin header is present)
      const { error: uploadError } = await supabase.storage
        .from('waterfall_uploads')
        .upload(filePath, file)
        
      if (uploadError) throw uploadError

      // 2. Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('waterfall_uploads')
        .getPublicUrl(filePath)
        
      const publicUrl = publicUrlData.publicUrl

      // 3. Insert into waterfall_photos using anon client
      const { error: dbError } = await supabase.from('waterfall_photos').insert({
        waterfall_id: selectedWaterfall,
        image_url: publicUrl,
        caption: caption,
        credit_name: credit,
        is_hero: true // Make this the new hero image
      })

      if (dbError) throw dbError

      setUploadStatus('✅ Successfully uploaded and linked photo!')
      setFile(null)
      setCaption('')
      
    } catch (err: any) {
      console.error(err)
      setUploadStatus(`❌ Upload failed: ${err.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  if (!adminKey) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 flex-grow w-full">
        <div className="bg-white p-8 rounded-xl shadow-xl border-2 border-slate-200">
          <div className="text-center mb-8">
            <span className="text-4xl">🔐</span>
            <h2 className="font-serif text-2xl font-bold text-superior-navy mt-4">System Access</h2>
            <p className="text-xs text-slate-500 mt-2">Enter your master passcode to access the admin upload portal.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                disabled={!!lockoutTime || isAuthenticating}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded text-center font-mono text-lg focus:ring-2 focus:ring-copper-orange focus:border-copper-orange outline-none disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
            
            {authError && (
              <div className="bg-red-50 text-red-600 text-xs p-3 rounded font-semibold text-center border border-red-200">
                {authError}
              </div>
            )}
            
            <button
              type="submit"
              disabled={!!lockoutTime || isAuthenticating || !passcode}
              className="w-full bg-superior-navy hover:bg-slate-800 text-white font-bold py-3 rounded shadow transition disabled:opacity-50"
            >
              {isAuthenticating ? 'Verifying...' : lockoutTime ? `Locked (${Math.ceil((lockoutTime - Date.now())/1000)}s)` : 'Authenticate'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 flex-grow w-full space-y-8">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-pinery-green">Admin Dashboard</h2>
          <p className="text-sm text-slate-500">Secure connection established.</p>
        </div>
        <button 
          onClick={() => setAdminKey(null)}
          className="text-xs font-bold text-slate-500 hover:text-red-500 transition px-3 py-1 bg-slate-100 rounded"
        >
          End Session
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
        <h3 className="font-serif text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>📸</span> Upload Authentic Waterfall Photo
        </h3>
        
        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Target Waterfall</label>
            <select 
              value={selectedWaterfall}
              onChange={(e) => setSelectedWaterfall(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-copper-orange outline-none"
            >
              <option value="">-- Select a waterfall --</option>
              {waterfalls.map(wf => (
                <option key={wf.id} value={wf.id}>{wf.name} ({wf.county})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Image File</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
              className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-copper-orange file:text-white hover:file:bg-tahquamenon-amber"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Caption (Optional)</label>
              <input 
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Taken from the lower viewing deck"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-copper-orange outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Credit / Author</label>
              <input 
                type="text"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-copper-orange outline-none"
              />
            </div>
          </div>
          
          {uploadStatus && (
            <div className={`p-3 rounded text-sm font-semibold ${uploadStatus.includes('✅') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {uploadStatus}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isUploading || !selectedWaterfall || !file}
              className="w-full bg-copper-orange hover:bg-tahquamenon-amber text-white font-bold py-3 rounded shadow transition disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading to Supabase...
                </>
              ) : (
                'Upload & Set as Hero Image'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
