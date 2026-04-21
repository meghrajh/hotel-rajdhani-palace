import { createServer } from 'node:http'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.join(projectRoot, 'dist')
const dataDir = path.join(projectRoot, 'server', 'data')
const reservationsFile = path.join(dataDir, 'reservations.json')
const contactsFile = path.join(dataDir, 'contacts.json')

const port = Number(process.env.PORT || 8787)

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

async function ensureDataFile(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })

  try {
    await fs.access(filePath)
  } catch {
    await fs.writeFile(filePath, '[]\n', 'utf8')
  }
}

async function readCollection(filePath) {
  await ensureDataFile(filePath)
  const raw = await fs.readFile(filePath, 'utf8')

  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function writeCollection(filePath, records) {
  await ensureDataFile(filePath)
  await fs.writeFile(filePath, `${JSON.stringify(records, null, 2)}\n`, 'utf8')
}

async function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk

      if (body.length > 1_000_000) {
        reject(new Error('Payload too large'))
        request.destroy()
      }
    })

    request.on('end', () => {
      if (!body) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(body))
      } catch {
        reject(new Error('Invalid JSON body'))
      }
    })

    request.on('error', reject)
  })
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, jsonHeaders)
  response.end(JSON.stringify(payload))
}

function createId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function validateContact(payload) {
  const errors = []

  if (!payload.name?.trim()) errors.push('Name is required.')
  if (!payload.email?.trim()) errors.push('Email is required.')
  if (!payload.message?.trim()) errors.push('Message is required.')

  return errors
}

function validateReservation(payload) {
  const errors = []

  if (!payload.name?.trim()) errors.push('Name is required.')
  if (!payload.phone?.trim()) errors.push('Phone is required.')
  if (!payload.date?.trim()) errors.push('Date is required.')
  if (!payload.time?.trim()) errors.push('Time is required.')

  const guests = Number(payload.guests)
  if (!Number.isFinite(guests) || guests < 1) {
    errors.push('Guests must be at least 1.')
  }

  return errors
}

async function handleApi(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`)

  if (request.method === 'OPTIONS') {
    response.writeHead(204, jsonHeaders)
    response.end()
    return true
  }

  if (request.method === 'GET' && url.pathname === '/api/health') {
    sendJson(response, 200, { ok: true, service: 'rajdhani-api' })
    return true
  }

  if (request.method === 'GET' && url.pathname === '/api/dashboard') {
    const [reservations, contacts] = await Promise.all([
      readCollection(reservationsFile),
      readCollection(contactsFile),
    ])

    sendJson(response, 200, {
      stats: {
        reservations: reservations.length,
        contacts: contacts.length,
      },
      reservations: reservations.slice().reverse(),
      contacts: contacts.slice().reverse(),
    })
    return true
  }

  if (request.method === 'POST' && url.pathname === '/api/contact') {
    const payload = await readBody(request)
    const errors = validateContact(payload)

    if (errors.length > 0) {
      sendJson(response, 400, { message: 'Validation failed', errors })
      return true
    }

    const contacts = await readCollection(contactsFile)
    const record = {
      id: createId('msg'),
      name: payload.name.trim(),
      phone: payload.phone?.trim() || '',
      email: payload.email.trim(),
      message: payload.message.trim(),
      createdAt: new Date().toISOString(),
    }

    contacts.push(record)
    await writeCollection(contactsFile, contacts)
    sendJson(response, 201, { message: 'Message received successfully.', record })
    return true
  }

  if (request.method === 'POST' && url.pathname === '/api/reservations') {
    const payload = await readBody(request)
    const errors = validateReservation(payload)

    if (errors.length > 0) {
      sendJson(response, 400, { message: 'Validation failed', errors })
      return true
    }

    const reservations = await readCollection(reservationsFile)
    const record = {
      id: createId('res'),
      name: payload.name.trim(),
      phone: payload.phone.trim(),
      date: payload.date.trim(),
      time: payload.time.trim(),
      guests: Number(payload.guests),
      createdAt: new Date().toISOString(),
    }

    reservations.push(record)
    await writeCollection(reservationsFile, reservations)
    sendJson(response, 201, {
      message: 'Reservation saved successfully.',
      record,
    })
    return true
  }

  return false
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`)
  const requestedPath = url.pathname === '/' ? 'index.html' : url.pathname.slice(1)
  const filePath = path.join(distDir, requestedPath)

  try {
    const file = await fs.readFile(filePath)
    const ext = path.extname(filePath)
    const contentType =
      {
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
      }[ext] || 'application/octet-stream'

    response.writeHead(200, { 'Content-Type': contentType })
    response.end(file)
    return
  } catch {
    try {
      const html = await fs.readFile(path.join(distDir, 'index.html'))
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      response.end(html)
    } catch {
      sendJson(response, 404, {
        message:
          'Frontend build not found. Run "npm run build" before starting the production server.',
      })
    }
  }
}

const server = createServer(async (request, response) => {
  try {
    const handled = await handleApi(request, response)

    if (handled) {
      return
    }

    if (request.method === 'GET') {
      await serveStatic(request, response)
      return
    }

    sendJson(response, 404, { message: 'Route not found.' })
  } catch (error) {
    sendJson(response, 500, {
      message: 'Internal server error.',
      detail: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

server.listen(port, () => {
  console.log(`Rajdhani full-stack server running on http://localhost:${port}`)
})
