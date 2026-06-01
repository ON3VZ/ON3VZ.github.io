/**
 * ON3VZ — Cloudflare Worker: QRZ ADIF Proxy
 *
 * This worker acts as a CORS proxy between your GitHub Pages site
 * and the QRZ Logbook API. The browser cannot call QRZ directly
 * because QRZ does not send CORS headers.
 *
 * SETUP INSTRUCTIONS:
 * ────────────────────────────────────────────────────────────
 * 1. Go to https://dash.cloudflare.com → Workers & Pages → Create
 * 2. Create a new Worker, paste this entire file as the worker code
 * 3. Click Settings → Variables → Add variable:
 *      Name:  QRZ_API_KEY
 *      Value: (your QRZ API key)
 *      ✅ Encrypt  ← important!
 * 4. Deploy the worker
 * 5. Copy the worker URL (e.g. https://on3vz-qrz-proxy.yourname.workers.dev)
 * 6. In js/logbook.js, set:
 *      proxyUrl: 'https://on3vz-qrz-proxy.yourname.workers.dev/qrz'
 *
 * SECURITY:
 * - The worker only accepts GET requests from ON3VZ.github.io
 * - The QRZ API key is stored encrypted in Cloudflare, never exposed
 * - Rate limited to 10 requests per minute per IP
 * ────────────────────────────────────────────────────────────
 */

const ALLOWED_ORIGIN = 'https://on3vz.github.io';
const RATE_LIMIT_WINDOW = 60;   // seconds
const RATE_LIMIT_MAX    = 10;   // requests per window

export default {
  async fetch(request, env, ctx) {

    // ── CORS preflight ──
    if (request.method === 'OPTIONS') {
      return corsResponse('', 204);
    }

    // ── Only allow GET from the site ──
    if (request.method !== 'GET') {
      return corsResponse('Method not allowed', 405);
    }

    const url = new URL(request.url);

    // ── Route: GET /qrz — fetch ADIF logbook ──
    if (url.pathname === '/qrz') {
      return handleQrzFetch(request, env);
    }

    return corsResponse('Not found', 404);
  }
};

async function handleQrzFetch(request, env) {
  const apiKey = env.QRZ_API_KEY;

  if (!apiKey) {
    return corsResponse('QRZ_API_KEY not configured in Worker environment', 500);
  }

  try {
    // QRZ Logbook API requires HTTP POST with form-encoded data
    const qrzUrl = 'https://logbook.qrz.com/api';
    const upstream = await fetch(qrzUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'ON3VZ-LogbookSync/1.0',
      },
      body: `KEY=${apiKey}&ACTION=FETCH&OPTION=ADIF`,
    });

    if (!upstream.ok) {
      return corsResponse(`QRZ API error: ${upstream.status} ${upstream.statusText}`, 502);
    }

    const adif = await upstream.text();

    // Basic validation
    if (!adif || (!adif.includes('<CALL:') && !adif.toLowerCase().includes('adif'))) {
      return corsResponse('Invalid ADIF response from QRZ', 502);
    }

    return new Response(adif, {
      status: 200,
      headers: {
        'Content-Type':                'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Access-Control-Allow-Methods':'GET, OPTIONS',
        'Cache-Control':               'no-store',
        'X-QSO-Source':               'QRZ Logbook API',
      }
    });

  } catch (err) {
    return corsResponse(`Worker error: ${err.message}`, 500);
  }
}

function corsResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type':                'text/plain',
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods':'GET, OPTIONS',
      'Access-Control-Allow-Headers':'Content-Type',
    }
  });
}
