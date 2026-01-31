import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Baby, Heart, Sparkle, GenderMale, GenderFemale } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import confetti from 'canvas-confetti'

type Gender = 'boy' | 'girl'

interface Guess {
  twin1: Gender
  twin2: Gender
}

const ACTUAL_GENDERS: Guess = {
  twin1: 'girl',
  twin2: 'boy'
}

function App() {
  const [playerName, setPlayerName] = useState('')
  const [twin1Guess, setTwin1Guess] = useState<Gender | null>(null)
  const [twin2Guess, setTwin2Guess] = useState<Gender | null>(null)
  const [gameState, setGameState] = useState<'input' | 'countdown' | 'reveal'>('input')
  const [countdown, setCountdown] = useState(5)
  const [guesses, setGuesses] = useKV<Array<{ name: string; twin1: Gender; twin2: Gender; timestamp: number }>>('gender-guesses', [])

  const canSubmit = playerName.trim() !== '' && twin1Guess !== null && twin2Guess !== null

  const handleSubmit = () => {
    if (!canSubmit || !twin1Guess || !twin2Guess) return

    setGuesses((current) => {
      const currentArray = current || []
      return [
        ...currentArray,
        {
          name: playerName,
          twin1: twin1Guess,
          twin2: twin2Guess,
          timestamp: Date.now()
        }
      ]
    })

    setGameState('countdown')
    setCountdown(5)

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          setTimeout(() => setGameState('reveal'), 100)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const isCorrect = twin1Guess === ACTUAL_GENDERS.twin1 && twin2Guess === ACTUAL_GENDERS.twin2

  useEffect(() => {
    if (gameState === 'reveal' && isCorrect) {
      const duration = 3000
      const animationEnd = Date.now() + duration

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min
      }

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          clearInterval(interval)
          return
        }

        const particleCount = 50

        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.1, 0.3),
            y: Math.random() - 0.2
          },
          colors: ['#E91E63', '#2196F3', '#FFD700', '#FF69B4', '#87CEEB']
        })
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: randomInRange(0.7, 0.9),
            y: Math.random() - 0.2
          },
          colors: ['#E91E63', '#2196F3', '#FFD700', '#FF69B4', '#87CEEB']
        })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [gameState, isCorrect])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/30 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Baby size={40} weight="fill" className="text-primary" />
            <h1 className="text-4xl sm:text-5xl font-semibold text-foreground">Twin Gender Reveal</h1>
            <Baby size={40} weight="fill" className="text-primary" />
          </div>
          <p className="text-lg text-muted-foreground font-light">Guess the genders and join the celebration!</p>
        </motion.div>

        <Card className="p-6 sm:p-8 shadow-2xl border-2 border-primary/20">
          {gameState === 'input' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div>
                <label htmlFor="player-name" className="block text-xl font-medium mb-3 text-center">
                  What's your name?
                </label>
                <Input
                  id="player-name"
                  type="text"
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="text-center text-lg py-6 font-medium"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-medium text-center">Twin A</h2>
                  <CakeBox gender={null} />
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setTwin1Guess('boy')}
                      className={`flex-1 h-14 text-lg font-medium transition-all ${
                        twin1Guess === 'boy'
                          ? 'bg-boy text-boy-foreground hover:bg-boy/90 scale-105'
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      <GenderMale size={24} weight="bold" className="mr-2" />
                      Boy
                    </Button>
                    <Button
                      onClick={() => setTwin1Guess('girl')}
                      className={`flex-1 h-14 text-lg font-medium transition-all ${
                        twin1Guess === 'girl'
                          ? 'bg-girl text-girl-foreground hover:bg-girl/90 scale-105'
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      <GenderFemale size={24} weight="bold" className="mr-2" />
                      Girl
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-medium text-center">Twin B</h2>
                  <CakeBox gender={null} />
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setTwin2Guess('boy')}
                      className={`flex-1 h-14 text-lg font-medium transition-all ${
                        twin2Guess === 'boy'
                          ? 'bg-boy text-boy-foreground hover:bg-boy/90 scale-105'
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      <GenderMale size={24} weight="bold" className="mr-2" />
                      Boy
                    </Button>
                    <Button
                      onClick={() => setTwin2Guess('girl')}
                      className={`flex-1 h-14 text-lg font-medium transition-all ${
                        twin2Guess === 'girl'
                          ? 'bg-girl text-girl-foreground hover:bg-girl/90 scale-105'
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      <GenderFemale size={24} weight="bold" className="mr-2" />
                      Girl
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full h-16 text-xl font-medium bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all tracking-wide"
              >
                Reveal the Genders! 🎉
              </Button>
            </motion.div>
          )}

          {gameState === 'countdown' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <p className="text-2xl font-medium text-center mb-8">Get ready, {playerName}!</p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-medium text-center">Twin A</h2>
                  <CakeBox gender={null} isCountdown countdownProgress={(5 - countdown) / 5} />
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-medium text-center">Twin B</h2>
                  <CakeBox gender={null} isCountdown countdownProgress={(5 - countdown) / 5} />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={countdown}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="text-9xl font-bold text-accent text-center"
                >
                  {countdown}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {gameState === 'reveal' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-medium text-center">Twin A</h2>
                  <CakeBox gender={ACTUAL_GENDERS.twin1} isRevealed />
                  <p className="text-center text-lg font-medium">
                    It's a {ACTUAL_GENDERS.twin1 === 'girl' ? '💕 Girl! 💕' : '💙 Boy! 💙'}
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-medium text-center">Twin B</h2>
                  <CakeBox gender={ACTUAL_GENDERS.twin2} isRevealed />
                  <p className="text-center text-lg font-medium">
                    It's a {ACTUAL_GENDERS.twin2 === 'girl' ? '💕 Girl! 💕' : '💙 Boy! 💙'}
                  </p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className={`p-6 rounded-lg text-center ${
                  isCorrect ? 'bg-accent/20 border-2 border-accent' : 'bg-primary/20 border-2 border-primary'
                }`}
              >
                {isCorrect ? (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Sparkle size={32} weight="fill" className="text-accent" />
                      <h3 className="text-3xl font-semibold">Congratulations, {playerName}!</h3>
                      <Sparkle size={32} weight="fill" className="text-accent" />
                    </div>
                    <p className="text-xl mb-2">You guessed both genders correctly! 🎊</p>
                    <p className="text-lg mb-2">You should definitely buy some Toto to celebrate! 🎟️</p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Heart size={24} weight="fill" className="text-accent" />
                      <p className="text-lg font-medium">The babies can't wait to meet you in July!</p>
                      <Heart size={24} weight="fill" className="text-accent" />
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-3xl font-semibold mb-3">Hope you had fun, {playerName}! 🎉</h3>
                    <p className="text-xl mb-2">Better luck next time with the guessing!</p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Heart size={24} weight="fill" className="text-primary" />
                      <p className="text-lg font-medium">The babies can't wait to meet you in July!</p>
                      <Heart size={24} weight="fill" className="text-primary" />
                    </div>
                  </>
                )}
              </motion.div>

              <Button
                onClick={() => {
                  setGameState('input')
                  setPlayerName('')
                  setTwin1Guess(null)
                  setTwin2Guess(null)
                  setCountdown(5)
                }}
                className="w-full h-14 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Play Again
              </Button>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  )
}

interface CakeBoxProps {
  gender: Gender | null
  isRevealed?: boolean
  isCountdown?: boolean
  countdownProgress?: number
}

function CakeBox({ gender, isRevealed = false, isCountdown = false, countdownProgress = 0 }: CakeBoxProps) {
  const lidRotation = isCountdown 
    ? -30 * countdownProgress 
    : isRevealed 
      ? -120 
      : 0

  const boxOpacity = isRevealed ? 0.3 : 1
  const boxShake = isCountdown && countdownProgress > 0.2

  return (
    <div className="relative w-full aspect-square max-w-xs mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {isRevealed && gender && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: 'backOut' }}
              className={`text-9xl ${gender === 'boy' ? 'grayscale-0' : ''}`}
              style={{
                filter: gender === 'boy' ? 'hue-rotate(200deg) saturate(1.5)' : 'hue-rotate(330deg) saturate(1.3)'
              }}
            >
              🎂
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute inset-0 bg-card border-4 border-border rounded-lg shadow-lg overflow-hidden"
        initial={false}
        animate={
          boxShake
            ? {
                opacity: boxOpacity,
                x: [0, -2, 2, -2, 2, 0],
                y: [0, -1, 1, -1, 1, 0],
              }
            : { opacity: boxOpacity, x: 0, y: 0 }
        }
        transition={
          boxShake
            ? { 
                x: { duration: 0.4, repeat: Infinity },
                y: { duration: 0.4, repeat: Infinity },
              }
            : {}
        }
      >
        <motion.div
          className="absolute inset-x-0 top-0 h-1/4 bg-accent border-b-4 border-border origin-top"
          initial={false}
          animate={{ rotateX: lidRotation }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🎀
          </div>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
          🎁
        </div>
      </motion.div>
    </div>
  )
}

export default App