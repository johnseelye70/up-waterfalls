import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { REMOVED_WATERFALL_IDS } from '../lib/enrichWaterfall'

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
  waterfall_photos?: { id: string }[]
}

interface QueuedPhoto {
  id: string
  file: File
  previewUrl: string
  waterfallId: string
  caption: string
  credit: string
  status: 'idle' | 'uploading' | 'success' | 'error'
  errorMessage?: string
}

interface PriorityFall {
  name: string
  county: string
  notes: string
}

const PRIORITY_TRAIL_FALLS: PriorityFall[] = [
  { name: "Jacob's Falls", county: "Keweenaw County", notes: "Iconic roadside cascade on M-26 beside The Jampot monastery bakery" },
  { name: "Sturgeon Falls", county: "Houghton County", notes: "Stunning 30-ft plunge into Michigan's Grand Canyon gorge" },
  { name: "Piers Gorge Falls", county: "Dickinson County", notes: "Powerful Class IV whitewater gorge and cascades on Menominee River" },
  { name: "Rock River Falls", county: "Alger County", notes: "Remote 15-ft wilderness plunge in the Rock River Canyon Wilderness" },
  { name: "Big Erick's Fall", county: "Baraga County", notes: "Rushing rapids and cascades over granite ledges on the Huron River" },
  { name: "Silver Falls", county: "Baraga County", notes: "Scenic Silver River drops and pool near Skanee and Arvon Township" },
  { name: "Chicagon Falls", county: "Iron County", notes: "Hidden 20-ft woodland cascade tucked away in southern Iron County" },
  { name: "Powder Horn Falls", county: "Gogebic County", notes: "Secluded forest waterfall near Big Powderhorn Mountain" },
  { name: "Alder Falls", county: "Marquette County", notes: "Dramatic 30-ft slide waterfall tumbling into a rocky forested gorge" },
  { name: "Reany Falls", county: "Marquette County", notes: "Peaceful step falls near the Dead River storage basin" },
  { name: "Little Miners Falls", county: "Alger County", notes: "Tributary waterfall tucked high above Miners Lake in Pictured Rocks" },
  { name: "Upper Dead River Falls #1", county: "Marquette County", notes: "Upper cascade of the rugged Dead River gorge trail series" },
  { name: "Upper Dead River Falls #2", county: "Marquette County", notes: "Mid-tier wilderness cataract tumbling through rocky ledges" },
  { name: "Upper Dead River Falls #3", county: "Marquette County", notes: "Broad slide and churning pools on the upper Dead River" },
  { name: "Lower Canyon Falls", county: "Baraga County", notes: "Downstream gorge cascade along the Sturgeon River below Canyon Falls" },
  { name: "Middle Canyon Falls", county: "Baraga County", notes: "Deep canyon rapids and falls carved through sandstone bedrock" },
  { name: "Quartzite Falls", county: "Baraga County", notes: "Slate River cascade spilling over dark Precambrian quartzite rock" },
  { name: "Black Slate Falls", county: "Baraga County", notes: "Twin tiered falls plunging over slate bedrock on the Slate River" },
  { name: "Upper Slate Falls", county: "Baraga County", notes: "Upper Slate River waterfall deep in the Arvon Township forest" },
  { name: "Tioga Falls", county: "Baraga County", notes: "Forest cascade and picnic rest area on the Tioga River off US-41" },
  { name: "Trap Falls", county: "Ontonagon County", notes: "Scenic drop on the North Country Trail in the Bergland forest" },
  { name: "Whitefish Falls", county: "Alger County", notes: "15-ft broad river cascade on the Whitefish River near Trenary" },
  { name: "Haymeadows Falls", county: "Delta County", notes: "Limestone stepping-stone falls in the Hiawatha National Forest" },
  { name: "Rapid River Falls", county: "Delta County", notes: "Wide limestone ledge falls and park along US-41 in Delta County" },
  { name: "Wyandote Falls", county: "Houghton County", notes: "Secluded woodland cascade on the Misery River near Toivola" },
  { name: "Cascade Falls", county: "Ontonagon County", notes: "Multi-drop cascade on the West Branch Ontonagon River" },
  { name: "Nonesuch Falls", county: "Ontonagon County", notes: "Historic waterfall at the abandoned 19th-century Nonesuch Mine" },
  { name: "Chapel Beach Falls", county: "Alger County", notes: "Scenic Lake Superior beach cascade where Chapel Creek hits the sand" },
  { name: "Horseshoe Falls", county: "Alger County", notes: "Spring-fed 20-ft cascade surrounded by towering hemlocks in Munising" },
  { name: "Potato Patch Falls", county: "Alger County", notes: "Quiet tributary cascade located in Pictured Rocks National Lakeshore" },
  { name: "Pinnacle Falls", county: "Marquette County", notes: "Spectacular 25-ft plunge on the Yellow Dog River" },
  { name: "Big Pup Falls", county: "Marquette County", notes: "Gushing slide and rapids on Big Pup Creek in Marquette County" },
  { name: "Little Garlic Falls", county: "Marquette County", notes: "Classic 8-mile wilderness hike to a secluded hemlock gorge" },
  { name: "Big Garlic Falls", county: "Marquette County", notes: "Remote rugged gorge falls upstream on the Big Garlic River" },
  { name: "Silver River Falls", county: "Keweenaw County", notes: "Stepped cascade on the Silver River flowing out into Lake Superior" }
];

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
  const [defaultCredit, setDefaultCredit] = useState('Admin Upload')
  const [uploadStatus, setUploadStatus] = useState('')
  
  // Multi-Photo Dropzone & Queue State
  const [queue, setQueue] = useState<QueuedPhoto[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isBatchUploading, setIsBatchUploading] = useState(false)
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 })

  // Priority Hit List Filter & Search State
  const [hitListSearch, setHitListSearch] = useState('')
  const [hitListFilter, setHitListFilter] = useState<'priority' | 'all-uncovered'>('priority')

  // Gallery Management State
  const [photos, setPhotos] = useState<any[]>([])
  
  // Password Management State
  const [newPassword, setNewPassword] = useState('')
  const [passwordStatus, setPasswordStatus] = useState('')

  // DOM Refs
  const dropzoneRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
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
  const fetchWaterfalls = async () => {
    const { data, error } = await supabase
      .from('waterfalls')
      .select('id, name, county, waterfall_photos(id)')
      .order('name')
    if (error) {
      console.error("Error fetching waterfalls:", error)
      setUploadStatus(`❌ DB Error: ${error.message}`)
    }
    if (data) {
      const cleaned = data
        .filter(w => !REMOVED_WATERFALL_IDS.has(w.id))
        .map(w => ({
          ...w,
          name: (w.id === '677041e5-cfa4-4cdd-8755-c2e8528f0ff2' || w.name === 'Harley Falls #1') ? 'Harley Falls' : w.name
        }))
      setWaterfalls(cleaned as any)
    }
  }

  useEffect(() => {
    if (adminKey) {
      fetchWaterfalls()
    }
  }, [adminKey])

  // Fetch photos when a waterfall is selected or an upload succeeds
  useEffect(() => {
    if (selectedWaterfall) {
      const fetchPhotos = async () => {
        const { data } = await supabase.from('waterfall_photos').select('*').eq('waterfall_id', selectedWaterfall)
        if (data) setPhotos(data)
      }
      fetchPhotos()
    } else {
      setPhotos([])
    }
  }, [selectedWaterfall, uploadStatus])

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

  // Handle incoming files for dropzone
  const handleFilesAdded = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const newItems: QueuedPhoto[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        waterfallId: selectedWaterfall || (waterfalls[0]?.id || ''),
        caption: '',
        credit: defaultCredit || 'Admin Upload',
        status: 'idle'
      }))

    setQueue(prev => [...prev, ...newItems])
    setUploadStatus('')
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFilesAdded(e.dataTransfer.files)
  }

  const handleRemoveQueueItem = (id: string) => {
    setQueue(prev => {
      const item = prev.find(p => p.id === id)
      if (item) URL.revokeObjectURL(item.previewUrl)
      return prev.filter(p => p.id !== id)
    })
  }

  const handleClearQueue = () => {
    queue.forEach(item => URL.revokeObjectURL(item.previewUrl))
    setQueue([])
  }

  const handleApplySelectedToAll = () => {
    if (!selectedWaterfall) return
    setQueue(prev => prev.map(item => ({ ...item, waterfallId: selectedWaterfall })))
    setUploadStatus(`⚡ Applied selected waterfall to all ${queue.length} queued photos.`)
  }

  // Batch Upload Processor
  const handleBatchUpload = async () => {
    if (!adminKey || queue.length === 0 || isBatchUploading) return

    setIsBatchUploading(true)
    setUploadStatus('🚀 Starting batch upload...')
    const itemsToUpload = queue.filter(item => item.status !== 'success')
    setBatchProgress({ current: 0, total: itemsToUpload.length })

    let successCount = 0
    let failureCount = 0

    for (let i = 0; i < itemsToUpload.length; i++) {
      const item = itemsToUpload[i]
      setBatchProgress({ current: i + 1, total: itemsToUpload.length })

      // Mark this item as uploading
      setQueue(prev => prev.map(p => p.id === item.id ? { ...p, status: 'uploading' } : p))

      try {
        if (!item.waterfallId) {
          throw new Error('No target waterfall selected')
        }

        const fileExt = item.file.name.split('.').pop() || 'jpg'
        const fileName = `${item.waterfallId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${fileExt}`
        const filePath = `waterfall_photos/${fileName}`

        // 1. Upload file to Supabase Storage bucket
        const { error: uploadError } = await supabase.storage
          .from('waterfall_uploads')
          .upload(filePath, item.file)

        if (uploadError) throw uploadError

        // 2. Obtain Public URL
        const { data: publicUrlData } = supabase.storage
          .from('waterfall_uploads')
          .getPublicUrl(filePath)

        const publicUrl = publicUrlData.publicUrl

        // 3. Check existing photos to set hero flag if it is the first photo
        const { count } = await supabase
          .from('waterfall_photos')
          .select('id', { count: 'exact', head: true })
          .eq('waterfall_id', item.waterfallId)

        const isFirstPhoto = count === 0

        // 4. Insert photo record
        const { error: dbError } = await supabase.from('waterfall_photos').insert({
          waterfall_id: item.waterfallId,
          image_url: publicUrl,
          caption: item.caption.trim() || null,
          credit_name: item.credit.trim() || defaultCredit || 'Admin Upload',
          is_hero: isFirstPhoto
        })

        if (dbError) throw dbError

        // Mark item as successful
        setQueue(prev => prev.map(p => p.id === item.id ? { ...p, status: 'success' } : p))
        successCount++

      } catch (err: any) {
        console.error('Upload failed for item:', item.file.name, err)
        setQueue(prev => prev.map(p => p.id === item.id ? { 
          ...p, 
          status: 'error', 
          errorMessage: err.message || 'Upload failed' 
        } : p))
        failureCount++
      }
    }

    setIsBatchUploading(false)
    fetchWaterfalls()
    setUploadStatus(`✅ Batch upload complete: ${successCount} uploaded successfully${failureCount > 0 ? `, ${failureCount} failed.` : '!'}`)
  }

  // Fast-Tag button click from Priority Hit List
  const handleFastTagSelect = (waterfallId: string) => {
    setSelectedWaterfall(waterfallId)
    // If there are queued photos without assigned waterfall, assign to this one
    setQueue(prev => prev.map(item => item.waterfallId ? item : { ...item, waterfallId }))
    dropzoneRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSetWaterfallPrimary = async (photoId: string) => {
    try {
      setUploadStatus('Updating...')
      
      const { error } = await supabase.rpc('admin_set_waterfall_primary', {
        p_secret: adminKey,
        p_waterfall_id: selectedWaterfall,
        p_photo_id: photoId
      })
      if (error) throw error
      
      // Refresh photos
      const { data, error: e3 } = await supabase.from('waterfall_photos').select('*').eq('waterfall_id', selectedWaterfall)
      if (e3) throw e3
      
      if (data) setPhotos(data)
      setUploadStatus('✅ Waterfall Primary updated!')
    } catch (err: any) {
      console.error(err)
      setUploadStatus(`❌ Update failed: ${err.message}`)
    }
  }

  const handleSetCountyPrimary = async (photoId: string) => {
    try {
      setUploadStatus('Updating...')
      const wf = waterfalls.find(w => w.id === selectedWaterfall)
      if (!wf) return
      
      const { error } = await supabase.rpc('admin_set_county_primary', {
        p_secret: adminKey,
        p_county: wf.county,
        p_photo_id: photoId
      })
      if (error) throw error
      
      // Refresh photos
      const { data, error: e3 } = await supabase.from('waterfall_photos').select('*').eq('waterfall_id', selectedWaterfall)
      if (e3) throw e3
      
      if (data) setPhotos(data)
      setUploadStatus('✅ County Primary updated!')
    } catch (err: any) {
      console.error(err)
      setUploadStatus(`❌ Update failed: ${err.message}`)
    }
  }

  const handleDeletePhoto = async (photoId: string) => {
    if (!window.confirm("Are you sure you want to delete this photo from the database?")) return;
    
    try {
      setUploadStatus('Deleting photo...')
      
      const { error } = await supabase.rpc('admin_delete_photo', {
        p_secret: adminKey,
        p_photo_id: photoId
      })
      if (error) throw error
      
      // Refresh photos
      const { data, error: e3 } = await supabase.from('waterfall_photos').select('*').eq('waterfall_id', selectedWaterfall)
      if (e3) throw e3
      
      if (data) setPhotos(data)
      fetchWaterfalls()
      setUploadStatus('✅ Photo deleted successfully!')
    } catch (err: any) {
      console.error(err)
      setUploadStatus(`❌ Delete failed: ${err.message}`)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword || !adminKey) return
    
    setPasswordStatus('Updating...')
    try {
      const newHash = await hashPasscode(newPassword)
      const { error } = await supabase.rpc('admin_update_passcode', {
        p_secret: adminKey,
        p_new_hash: newHash
      })
      if (error) throw error
      
      setPasswordStatus('✅ Password changed successfully!')
      setNewPassword('')
    } catch (err: any) {
      console.error(err)
      setPasswordStatus(`❌ Failed: ${err.message}`)
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

  // Filtered priority hits
  const matchedPriorityFalls = PRIORITY_TRAIL_FALLS.map(pf => {
    const dbMatch = waterfalls.find(w => 
      w.name.toLowerCase() === pf.name.toLowerCase() && 
      w.county.toLowerCase() === pf.county.toLowerCase()
    )
    const photoCount = dbMatch?.waterfall_photos?.length || 0
    return {
      ...pf,
      id: dbMatch?.id || '',
      photoCount,
      isCovered: photoCount > 0
    }
  })

  // Filter for display
  const displayedHits = hitListFilter === 'priority'
    ? matchedPriorityFalls.filter(f => {
        const query = hitListSearch.toLowerCase()
        return f.name.toLowerCase().includes(query) || f.county.toLowerCase().includes(query)
      })
    : waterfalls
        .filter(w => (!w.waterfall_photos || w.waterfall_photos.length === 0))
        .filter(w => {
          const query = hitListSearch.toLowerCase()
          return w.name.toLowerCase().includes(query) || w.county.toLowerCase().includes(query)
        })
        .map(w => ({
          name: w.name,
          county: w.county,
          notes: 'Upper Peninsula backcountry waterfall awaiting photo coverage',
          id: w.id,
          photoCount: 0,
          isCovered: false
        }))

  const uncoveredPriorityCount = matchedPriorityFalls.filter(f => !f.isCovered).length
  const totalUncoveredUPCount = waterfalls.filter(w => !w.waterfall_photos || w.waterfall_photos.length === 0).length

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex-grow w-full space-y-8">
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-4">
        <div>
          <h2 className="font-serif text-3xl font-bold text-pinery-green">Admin Dashboard</h2>
          <p className="text-sm text-slate-500">
            Secure session active. Database contains {waterfalls.length} waterfalls ({waterfalls.length - totalUncoveredUPCount} covered with authentic photos).
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setAdminKey(null)}
            className="text-xs font-bold text-slate-500 hover:text-red-500 transition px-3 py-2 bg-slate-100 rounded border border-slate-200"
          >
            End Session
          </button>
        </div>
      </div>

      {/* SECTION 1: Top 35 Priority Trail Falls Hit List */}
      <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎯</span>
              <h3 className="font-serif text-xl font-bold">Top 35 Priority Trail Falls (Awaiting Photos)</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              High-value wilderness and trail waterfalls requiring authentic photo coverage. Click "Fast-Tag" to target in dropzone.
            </p>
          </div>

          {/* Hit List Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setHitListFilter('priority')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition ${hitListFilter === 'priority' ? 'bg-copper-orange text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              Essential Trail Falls ({uncoveredPriorityCount} need photo)
            </button>
            <button
              onClick={() => setHitListFilter('all-uncovered')}
              className={`px-3 py-1.5 rounded text-xs font-bold transition ${hitListFilter === 'all-uncovered' ? 'bg-copper-orange text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              All Uncovered in UP ({totalUncoveredUPCount})
            </button>
          </div>
        </div>

        {/* Search bar inside Hit List */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="relative">
            <input
              type="text"
              value={hitListSearch}
              onChange={(e) => setHitListSearch(e.target.value)}
              placeholder="Search priority waterfalls by name or county..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded text-sm focus:ring-2 focus:ring-copper-orange outline-none"
            />
            <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
          </div>
        </div>

        {/* Scrollable inline list */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 p-2">
          {displayedHits.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-sm">
              No waterfalls match your search criteria.
            </div>
          ) : (
            displayedHits.map((fall, idx) => (
              <div 
                key={`${fall.name}-${idx}`} 
                className={`p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition ${fall.id === selectedWaterfall ? 'bg-amber-50 border border-copper-orange/40' : 'hover:bg-slate-50'}`}
              >
                <div className="space-y-1 flex-grow">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-slate-900">{fall.name}</span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {fall.county}
                    </span>
                    {fall.isCovered ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        ✅ Covered ({fall.photoCount} photo{fall.photoCount > 1 ? 's' : ''})
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                        ⚠️ Needs Photo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{fall.notes}</p>
                </div>

                <div className="flex-shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => handleFastTagSelect(fall.id)}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition flex items-center gap-1 shadow-sm ${selectedWaterfall === fall.id ? 'bg-emerald-600 text-white' : 'bg-superior-navy hover:bg-slate-800 text-white'}`}
                  >
                    {selectedWaterfall === fall.id ? '🎯 Active Target' : '⚡ Fast-Tag in Dropzone'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SECTION 2: Multi-Photo Dropzone & Fast-Tagger */}
      <div ref={dropzoneRef} className="bg-white p-6 rounded-xl shadow border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span>📸</span> Fast-Tagger & Multi-Photo Dropzone
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select or drop multiple authentic photos, tag target waterfalls, and batch upload to Supabase.
            </p>
          </div>
          {selectedWaterfall && (
            <div className="text-xs font-semibold px-3 py-1.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Active Waterfall: {waterfalls.find(w => w.id === selectedWaterfall)?.name || 'Selected'}
            </div>
          )}
        </div>

        {/* Master Target Waterfall Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Active Target Waterfall (Fast-Tag Master)
            </label>
            <select
              value={selectedWaterfall}
              onChange={(e) => setSelectedWaterfall(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded text-sm focus:ring-2 focus:ring-copper-orange outline-none"
            >
              <option value="">-- Choose a waterfall to fast-tag --</option>
              {waterfalls.map(wf => {
                const count = wf.waterfall_photos?.length || 0
                return (
                  <option key={wf.id} value={wf.id}>
                    {count === 0 ? '⚠️ [Needs Photo] ' : `✅ [${count} photo${count > 1 ? 's' : ''}] `}
                    {wf.name} ({wf.county})
                  </option>
                )
              })}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Default Credit / Author
            </label>
            <input
              type="text"
              value={defaultCredit}
              onChange={(e) => setDefaultCredit(e.target.value)}
              placeholder="e.g. John Seelye / Field Photo"
              className="w-full p-2.5 bg-white border border-slate-300 rounded text-sm focus:ring-2 focus:ring-copper-orange outline-none"
            />
          </div>
        </div>

        {/* Interactive Drag & Drop Box */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3 ${isDragging ? 'border-copper-orange bg-amber-50/50 scale-[1.01]' : 'border-slate-300 hover:border-copper-orange bg-slate-50/60'}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFilesAdded(e.target.files)}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-3xl border border-slate-200">
            {isDragging ? '📥' : '📂'}
          </div>
          <div>
            <p className="font-bold text-slate-800 text-base">
              Drag & Drop Multiple Waterfall Photos Here
            </p>
            <p className="text-xs text-slate-500 mt-1">
              or <span className="text-copper-orange font-semibold underline">browse files</span> from your computer (JPG, PNG, WEBP)
            </p>
          </div>
        </div>

        {/* Queue Management & Batch Actions */}
        {queue.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-100 p-3 rounded-lg border border-slate-200">
              <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span>📋</span> Queued for Upload: {queue.length} photo{queue.length > 1 ? 's' : ''}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {selectedWaterfall && (
                  <button
                    onClick={handleApplySelectedToAll}
                    type="button"
                    className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded text-xs font-semibold shadow-sm transition"
                  >
                    ⚡ Apply "{waterfalls.find(w => w.id === selectedWaterfall)?.name}" to All
                  </button>
                )}
                <button
                  onClick={handleClearQueue}
                  disabled={isBatchUploading}
                  type="button"
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded text-xs font-semibold transition disabled:opacity-50"
                >
                  Clear Queue
                </button>
              </div>
            </div>

            {/* Progress Bar during upload */}
            {isBatchUploading && (
              <div className="space-y-1 bg-amber-50 p-4 rounded-lg border border-amber-200">
                <div className="flex justify-between text-xs font-bold text-amber-900">
                  <span>Uploading photo {batchProgress.current} of {batchProgress.total}...</span>
                  <span>{Math.round((batchProgress.current / batchProgress.total) * 100)}%</span>
                </div>
                <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-copper-orange h-full transition-all duration-300"
                    style={{ width: `${(batchProgress.current / batchProgress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Queue Item Cards */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {queue.map((item) => {
                return (
                  <div 
                    key={item.id} 
                    className={`p-3 rounded-lg border flex flex-col md:flex-row items-center gap-4 bg-white transition ${item.status === 'success' ? 'border-emerald-300 bg-emerald-50/20' : item.status === 'error' ? 'border-red-300 bg-red-50/20' : 'border-slate-200'}`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-24 h-20 flex-shrink-0 rounded overflow-hidden bg-slate-100 border border-slate-200">
                      <img 
                        src={item.previewUrl} 
                        alt="Queue preview" 
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[9px] px-1 rounded font-mono">
                        {(item.file.size / (1024 * 1024)).toFixed(1)} MB
                      </span>
                    </div>

                    {/* Metadata & Waterfall Selector */}
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                      {/* Target Waterfall Selector */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Target Waterfall</label>
                        <select
                          value={item.waterfallId}
                          onChange={(e) => {
                            const val = e.target.value
                            setQueue(prev => prev.map(p => p.id === item.id ? { ...p, waterfallId: val } : p))
                          }}
                          disabled={item.status === 'uploading' || item.status === 'success'}
                          className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-copper-orange outline-none"
                        >
                          <option value="">-- Select Waterfall --</option>
                          {waterfalls.map(wf => (
                            <option key={wf.id} value={wf.id}>
                              {wf.name} ({wf.county})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Caption */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Caption (Optional)</label>
                        <input
                          type="text"
                          value={item.caption}
                          onChange={(e) => {
                            const val = e.target.value
                            setQueue(prev => prev.map(p => p.id === item.id ? { ...p, caption: val } : p))
                          }}
                          disabled={item.status === 'uploading' || item.status === 'success'}
                          placeholder="e.g. Taken from lower boardwalk"
                          className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-copper-orange outline-none"
                        />
                      </div>

                      {/* Credit */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Credit / Photographer</label>
                        <input
                          type="text"
                          value={item.credit}
                          onChange={(e) => {
                            const val = e.target.value
                            setQueue(prev => prev.map(p => p.id === item.id ? { ...p, credit: val } : p))
                          }}
                          disabled={item.status === 'uploading' || item.status === 'success'}
                          className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-copper-orange outline-none"
                        />
                      </div>
                    </div>

                    {/* Status badge & Remove button */}
                    <div className="flex-shrink-0 flex sm:flex-col items-center justify-between gap-2 w-full sm:w-auto">
                      {item.status === 'idle' && (
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          Ready
                        </span>
                      )}
                      {item.status === 'uploading' && (
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded animate-pulse">
                          Uploading...
                        </span>
                      )}
                      {item.status === 'success' && (
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded flex items-center gap-1">
                          ✅ Uploaded
                        </span>
                      )}
                      {item.status === 'error' && (
                        <span className="text-[11px] font-bold text-red-700 bg-red-100 px-2 py-1 rounded" title={item.errorMessage}>
                          ❌ Error
                        </span>
                      )}

                      <button
                        onClick={() => handleRemoveQueueItem(item.id)}
                        disabled={item.status === 'uploading'}
                        className="text-slate-400 hover:text-red-600 transition p-1 text-xs"
                        title="Remove from queue"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Batch Upload CTA Button */}
            <div className="pt-2">
              <button
                onClick={handleBatchUpload}
                disabled={isBatchUploading || queue.every(i => i.status === 'success')}
                className="w-full bg-copper-orange hover:bg-tahquamenon-amber text-white font-bold py-3.5 rounded-lg shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isBatchUploading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading {batchProgress.current} of {batchProgress.total} Photos...
                  </>
                ) : (
                  <>
                    <span>🚀</span> Upload All Queued Photos ({queue.filter(i => i.status !== 'success').length} remaining)
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Global status alert */}
        {uploadStatus && (
          <div className={`p-4 rounded-lg text-sm font-semibold ${uploadStatus.includes('✅') || uploadStatus.includes('⚡') ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {uploadStatus}
          </div>
        )}
      </div>

      {selectedWaterfall && photos.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>🖼️</span> Manage Gallery Photos
            </h3>
            {uploadStatus && uploadStatus.includes('Primary') && (
              <span className={`px-3 py-1 rounded text-xs font-bold ${uploadStatus.includes('✅') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                {uploadStatus}
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {photos.map(p => (
              <div key={p.id} className="border border-slate-200 rounded overflow-hidden flex flex-col relative group">
                <button 
                  onClick={(e) => { e.preventDefault(); handleDeletePhoto(p.id) }}
                  className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition focus:opacity-100"
                  title="Delete Photo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <img src={p.image_url} alt={p.caption || 'Waterfall'} className="w-full h-48 object-cover" />
                <div className="p-3 bg-slate-50 space-y-3 flex-grow flex flex-col justify-end">
                  {p.caption && <p className="text-xs text-slate-600 line-clamp-2">{p.caption}</p>}
                  <div className="flex gap-2 w-full">
                    <button 
                      onClick={(e) => { e.preventDefault(); handleSetWaterfallPrimary(p.id) }}
                      className={`flex-1 text-[10px] font-bold py-2 rounded border transition ${p.is_hero ? 'bg-copper-orange text-white border-copper-orange' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100 shadow-sm'}`}
                    >
                      {p.is_hero ? '⭐ Waterfall Primary' : 'Set Waterfall Primary'}
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); handleSetCountyPrimary(p.id) }}
                      className={`flex-1 text-[10px] font-bold py-2 rounded border transition ${p.is_county_hero ? 'bg-tahquamenon-amber text-white border-tahquamenon-amber' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100 shadow-sm'}`}
                    >
                      {p.is_county_hero ? '🗺️ County Primary' : 'Set County Primary'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
        <h3 className="font-serif text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>🔒</span> Change Master Passcode
        </h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">New Passcode</label>
            <input 
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new passcode"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-copper-orange outline-none"
              required
            />
          </div>
          {passwordStatus && (
            <div className={`p-3 rounded text-sm font-semibold ${passwordStatus.includes('✅') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {passwordStatus}
            </div>
          )}
          <button
            type="submit"
            disabled={!newPassword}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded shadow transition disabled:opacity-50"
          >
            Update Passcode
          </button>
        </form>
      </div>

    </div>
  )
}
