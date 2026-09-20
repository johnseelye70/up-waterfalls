export function getThumbnailUrl(url: string, width: number = 800): string {
  if (!url) return url

  // Wikimedia Commons images: load directly via Wikimedia's global CDN.
  // Avoid third-party resizing proxies (e.g. wsrv.nl) which frequently trigger Wikimedia bot rate-limits (HTTP 429/404).
  if (url.includes('upload.wikimedia.org/wikipedia/commons/')) {
    return url
  }

  // Handle Unsplash images
  if (url.includes('images.unsplash.com/')) {
    if (url.includes('?')) {
      return url.replace(/w=\d+/, `w=${width}`)
    } else {
      return `${url}?auto=format&fit=crop&w=${width}&q=80`
    }
  }

  return url
}
