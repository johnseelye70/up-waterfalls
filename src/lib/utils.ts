export function getThumbnailUrl(url: string, width: number = 800): string {
  if (!url) return url

  // Handle Wikimedia Commons images
  if (url.includes('upload.wikimedia.org/wikipedia/commons/') && !url.includes('/thumb/')) {
    try {
      const parts = url.split('/')
      const filename = parts[parts.length - 1]
      return url.replace('/commons/', '/commons/thumb/') + `/${width}px-` + filename
    } catch (e) {
      return url
    }
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
