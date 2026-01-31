import { useState, useEffect } from 'react'
import { generateClient } from 'aws-amplify/data'
import type { Schema } from '../../amplify/data/resource'
import { isConfigured } from '../amplifyConfig'

// Lazy client initialization - only create if Amplify is configured
let client: ReturnType<typeof generateClient<Schema>> | null = null

function getClient() {
  if (!isConfigured) {
    return null
  }
  if (!client) {
    client = generateClient<Schema>()
  }
  return client
}

export interface LeaderboardGuess {
  id?: string
  name: string
  twin1: 'boy' | 'girl'
  twin2: 'boy' | 'girl'
  timestamp: number
}

export function useAmplifyLeaderboard() {
  const [guesses, setGuesses] = useState<LeaderboardGuess[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all guesses
  const fetchGuesses = async () => {
    const amplifyClient = getClient()
    if (!amplifyClient) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const { data: items } = await amplifyClient.models.GenderGuess.list()
      
      const mapped = (items || []).map(item => ({
        id: item.id,
        name: item.name,
        twin1: item.twin1 as 'boy' | 'girl',
        twin2: item.twin2 as 'boy' | 'girl',
        timestamp: item.timestamp,
      }))
      
      setGuesses(mapped)
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
    const amplifyClient = getClient()
    if (!amplifyClient) {
      throw new Error('Amplify client not configured')
    }

    try {
      const { data: newItem } = await amplifyClient.models.GenderGuess.create({
        name: guess.name,
        twin1: guess.twin1,
        twin2: guess.twin2,
        timestamp: guess.timestamp,
      })

      if (newItem) {
        setGuesses(prev => [...prev, {
          id: newItem.id,
          name: newItem.name,
          twin1: newItem.twin1 as 'boy' | 'girl',
          twin2: newItem.twin2 as 'boy' | 'girl',
          timestamp: newItem.timestamp,
        }])
      }
      
      return newItem
    } catch (err) {
      console.error('Error adding guess:', err)
      setError('Failed to submit guess')
      throw err
    }
  }

  // Subscribe to real-time updates
  useEffect(() => {
    const amplifyClient = getClient()
    if (!amplifyClient) {
      setLoading(false)
      return
    }

    fetchGuesses()

    const sub = amplifyClient.models.GenderGuess.observeQuery().subscribe({
      next: ({ items }) => {
        const mapped = items.map(item => ({
          id: item.id,
          name: item.name,
          twin1: item.twin1 as 'boy' | 'girl',
          twin2: item.twin2 as 'boy' | 'girl',
          timestamp: item.timestamp,
        }))
        setGuesses(mapped)
      },
    })

    return () => sub.unsubscribe()
  }, [])

  return {
    guesses,
    addGuess,
    loading,
    error,
    refetch: fetchGuesses,
  }
}
