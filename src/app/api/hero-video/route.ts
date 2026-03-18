import { NextRequest, NextResponse } from 'next/server'

const BLOB_URL =
  'https://pacnima2dxuyknnr.private.blob.vercel-storage.com/katana-hero-banner-video.mp4'

/**
 * Proxy for the private Vercel Blob hero video.
 * Passes Range requests through so the browser can seek/scrub freely.
 * Cached at the edge for 1 hour to avoid re-fetching on every range request.
 */
export async function GET(req: NextRequest) {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    console.error('[hero-video] BLOB_READ_WRITE_TOKEN is not set')
    return new NextResponse('Server misconfiguration: missing token', { status: 500 })
  }

  // Forward the Range header so partial content / scrubbing works
  const fetchHeaders: HeadersInit = {
    Authorization: `Bearer ${token}`,
  }
  const range = req.headers.get('range')
  if (range) fetchHeaders['Range'] = range

  let upstream: Response
  try {
    upstream = await fetch(BLOB_URL, { headers: fetchHeaders })
  } catch (err) {
    console.error('[hero-video] fetch failed:', err)
    return new NextResponse(`Fetch error: ${String(err)}`, { status: 502 })
  }

  if (!upstream.ok && upstream.status !== 206) {
    const body = await upstream.text().catch(() => '')
    console.error(`[hero-video] upstream ${upstream.status}:`, body)
    return new NextResponse(`Upstream error ${upstream.status}: ${body}`, { status: upstream.status })
  }

  const resHeaders = new Headers()
  resHeaders.set('Content-Type', upstream.headers.get('Content-Type') ?? 'video/mp4')
  resHeaders.set('Accept-Ranges', 'bytes')
  // Cache at the CDN / browser for 1 hour — video doesn't change
  resHeaders.set('Cache-Control', 'public, max-age=3600, s-maxage=3600')

  const contentLength = upstream.headers.get('Content-Length')
  if (contentLength) resHeaders.set('Content-Length', contentLength)

  const contentRange = upstream.headers.get('Content-Range')
  if (contentRange) resHeaders.set('Content-Range', contentRange)

  return new NextResponse(upstream.body, {
    status: upstream.status, // 200 or 206 (Partial Content)
    headers: resHeaders,
  })
}
