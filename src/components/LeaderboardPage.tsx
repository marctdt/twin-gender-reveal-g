import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Sparkle, Medal, ChartBar, Users, WarningCircle } from '@phosphor-icons/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { useFileLeaderboard } from '../hooks/useFileLeaderboard';

// Actual genders of the twins (same as App.tsx)
const ACTUAL_GENDERS = {
  twin1: 'girl' as const,
  twin2: 'girl' as const,
};

const LeaderboardPage = () => {
  const { guesses, loading, error, refetch } = useFileLeaderboard();

  // Sort guesses by timestamp (most recent first)
  const sortedGuesses = [...guesses].sort((a, b) => b.timestamp - a.timestamp);

  // Filter correct guesses
  const correctGuesses = sortedGuesses.filter(
    (g) => g.twin1 === ACTUAL_GENDERS.twin1 && g.twin2 === ACTUAL_GENDERS.twin2
  );

  // Calculate statistics
  const totalParticipants = guesses.length;
  const correctPercentage = totalParticipants > 0 
    ? ((correctGuesses.length / totalParticipants) * 100).toFixed(1)
    : '0.0';

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/30 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-6xl"
        >
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/30 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-6xl"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <WarningCircle size={48} className="text-red-500" />
                <p className="text-red-500 font-semibold">Erreur lors du chargement du classement</p>
                <p className="text-sm text-muted-foreground">{error}</p>
                <Button onClick={refetch} variant="outline">
                  Réessayer
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/30 flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl space-y-6"
      >
        {/* Page Title */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-girl via-accent to-boy bg-clip-text text-transparent">
            Classement des prédictions
          </h1>
          <p className="text-muted-foreground">Découvrez qui a deviné juste !</p>
        </div>

        {/* Global Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar size={24} weight="fill" className="text-accent" />
                Statistiques globales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Total Participants */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/50"
                >
                  <Users size={32} weight="fill" className="text-accent" />
                  <span className="text-3xl font-bold">{totalParticipants}</span>
                  <span className="text-sm text-muted-foreground">Participant(s)</span>
                </motion.div>

                {/* Correct Guesses */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/50"
                >
                  <Trophy size={32} weight="fill" className="text-accent" />
                  <span className="text-3xl font-bold">{correctGuesses.length}</span>
                  <span className="text-sm text-muted-foreground">Gagnant(s)</span>
                </motion.div>

                {/* Success Rate */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background/50"
                >
                  <Sparkle size={32} weight="fill" className="text-accent" />
                  <span className="text-3xl font-bold">{correctPercentage}%</span>
                  <span className="text-sm text-muted-foreground">Taux de réussite</span>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Winners Section */}
        <AnimatePresence>
          {correctGuesses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2 border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-2xl">
                    <Crown size={28} weight="fill" className="text-accent" />
                    Gagnants 🎉
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-20">Rang</TableHead>
                          <TableHead>Nom</TableHead>
                          <TableHead>Prédictions</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {correctGuesses.map((guess, index) => (
                          <motion.tr
                            key={guess.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b"
                          >
                            <TableCell>
                              {index === 0 && <span className="text-2xl">🥇</span>}
                              {index === 1 && <span className="text-2xl">🥈</span>}
                              {index === 2 && <span className="text-2xl">🥉</span>}
                              {index > 2 && (
                                <Badge variant="outline" className="font-semibold">
                                  #{index + 1}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="font-semibold">{guess.name}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <div
                                  className={`px-3 py-1 rounded-full text-2xl ${
                                    guess.twin1 === 'girl' ? 'bg-girl/20' : 'bg-boy/20'
                                  }`}
                                >
                                  {guess.twin1 === 'girl' ? '👧' : '👦'}
                                </div>
                                <div
                                  className={`px-3 py-1 rounded-full text-2xl ${
                                    guess.twin2 === 'girl' ? 'bg-girl/20' : 'bg-boy/20'
                                  }`}
                                >
                                  {guess.twin2 === 'girl' ? '👧' : '👦'}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(guess.timestamp).toLocaleString()}
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* All Participants Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <Users size={24} weight="fill" className="text-foreground" />
                  Tous les participants
                </div>
                <Badge variant="secondary">{guesses.length} participant(s)</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Prédictions</TableHead>
                      <TableHead>Résultat</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedGuesses.map((guess, index) => {
                      const isCorrect =
                        guess.twin1 === ACTUAL_GENDERS.twin1 &&
                        guess.twin2 === ACTUAL_GENDERS.twin2;

                      return (
                        <motion.tr
                          key={guess.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className="border-b"
                        >
                          <TableCell className="text-muted-foreground">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium">{guess.name}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <div
                                className={`px-3 py-1 rounded-full text-2xl ${
                                  guess.twin1 === 'girl' ? 'bg-girl/20' : 'bg-boy/20'
                                }`}
                              >
                                {guess.twin1 === 'girl' ? '👧' : '👦'}
                              </div>
                              <div
                                className={`px-3 py-1 rounded-full text-2xl ${
                                  guess.twin2 === 'girl' ? 'bg-girl/20' : 'bg-boy/20'
                                }`}
                              >
                                {guess.twin2 === 'girl' ? '👧' : '👦'}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {isCorrect ? (
                              <Badge className="bg-accent hover:bg-accent/80">
                                ✓ Correct
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Incorrect</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(guess.timestamp).toLocaleString()}
                          </TableCell>
                        </motion.tr>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LeaderboardPage;
