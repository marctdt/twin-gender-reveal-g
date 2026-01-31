import { useState, useEffect } from 'react'

export interface LeaderboardGuess {
  id?: string
  name: string
  twin1: 'boy' | 'girl'
  twin2: 'boy' | 'girl'
  timestamp: number
}

const API_URL = '/api/guesses'

export function useFileLeaderboard() {
  const [guesses, setGuesses] = useState<LeaderboardGuess[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all guesses
  const fetchGuesses = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error('Failed to fetch guesses')
      }
      const data = await response.json()
      setGuesses(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching guesses:', err)
      setError('Failed to load leaderboard')
    } finally {
      setLoading(false)
    }
  }

  // Add a new guess
  const addGuess = async (guess: Omit<LeaderboardGuess, 'id'>) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guess),
      })

      if (!response.ok) {
        throw new Error('Failed to add guess')
      }

      const newGuess = await response.json()
      setGuesses(prev => [...prev, newGuess])
      return newGuess
    } catch (err) {
      console.error('Error adding guess:', err)
      setError('Failed to submit guess')
      throw err
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchGuesses()
    
    // Poll for updates every 5 seconds
    const interval = setInterval(fetchGuesses, 5000)
    
    return () => clearInterval(interval)
  }, [])

  return {
    guesses,
    addGuess,
    loading,
    error,
    refetch: fetchGuesses,
  }
}
