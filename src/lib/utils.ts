export function getThumbnailUrl(url: string, width: number = 800): string {
  if (!url) return url

  // Handle Wikimedia Commons images via public resizing proxy
  if (url.includes('upload.wikimedia.org/wikipedia/commons/')) {
    // Strip https:// or http:// for the proxy
    const cleanUrl = url.replace(/^https?:\/\//, '')
    // Use wsrv.nl (Images.weserv.nl) public caching and resizing proxy
    return `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}&output=webp`
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
