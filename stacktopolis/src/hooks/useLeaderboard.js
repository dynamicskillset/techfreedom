import { useState, useEffect, useCallback } from 'react'

const API_URL = import.meta.env.VITE_LEADERBOARD_URL || 'https://stacktopolis-g8ng0.bunny.run'

export function useLeaderboard() {
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchScores = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/scores?limit=20`)
      if (res.ok) {
        const data = await res.json()
        setScores(data.scores || [])
      }
    } catch {
      // Silently fail — leaderboard is non-critical
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchScores() }, [fetchScores])

  const addScore = useCallback(async (score) => {
    try {
      const res = await fetch(`${API_URL}/scores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(score),
      })
      if (res.ok) {
        await fetchScores()
      }
    } catch {
      // Silently fail
    }
  }, [fetchScores])

  return { scores, addScore, loading }
}
