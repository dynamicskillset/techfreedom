const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  })
}

function validateScore(body) {
  if (!body || typeof body !== 'object') return 'Invalid request body'
  if (typeof body.initials !== 'string' || !/^[A-Z]{3}$/.test(body.initials)) return 'Initials must be 3 uppercase letters'
  if (typeof body.totalScore !== 'number' || body.totalScore < 0 || body.totalScore > 9999) return 'Invalid score'
  if (typeof body.quarters !== 'number' || body.quarters < 0 || body.quarters > 999) return 'Invalid quarters'
  if (typeof body.title !== 'string' || body.title.length > 100) return 'Invalid title'
  if (typeof body.independence !== 'number' || body.independence < 0 || body.independence > 100) return 'Invalid independence'
  if (typeof body.cause !== 'string' || body.cause.length > 50) return 'Invalid cause'
  if (typeof body.difficulty !== 'string' || !['easy', 'normal', 'hard'].includes(body.difficulty)) return 'Invalid difficulty'
  return null
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS })
    }

    const url = new URL(request.url)

    if (url.pathname === '/scores' && request.method === 'GET') {
      const difficulty = url.searchParams.get('difficulty')
      const limit = Math.min(parseInt(url.searchParams.get('limit') || '20', 10), 50)

      let result
      if (difficulty && ['easy', 'normal', 'hard'].includes(difficulty)) {
        result = await env.DB.prepare(
          'SELECT initials, total_score, quarters, title, independence, cause, difficulty, created_at FROM scores WHERE difficulty = ? ORDER BY total_score DESC LIMIT ?'
        ).bind(difficulty, limit).all()
      } else {
        result = await env.DB.prepare(
          'SELECT initials, total_score, quarters, title, independence, cause, difficulty, created_at FROM scores ORDER BY total_score DESC LIMIT ?'
        ).bind(limit).all()
      }

      const scores = (result.results || []).map(row => ({
        initials: row.initials,
        totalScore: row.total_score,
        quarters: row.quarters,
        title: row.title,
        independence: row.independence,
        cause: row.cause,
        difficulty: row.difficulty,
        date: row.created_at,
      }))

      return json({ scores })
    }

    if (url.pathname === '/scores' && request.method === 'POST') {
      let body
      try {
        body = await request.json()
      } catch {
        return json({ error: 'Invalid JSON' }, 400)
      }

      const error = validateScore(body)
      if (error) return json({ error }, 400)

      await env.DB.prepare(
        'INSERT INTO scores (initials, total_score, quarters, title, independence, cause, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)'
      ).bind(
        body.initials,
        body.totalScore,
        body.quarters,
        body.title,
        body.independence,
        body.cause,
        body.difficulty,
      ).run()

      return json({ ok: true }, 201)
    }

    return json({ error: 'Not found' }, 404)
  },
}
