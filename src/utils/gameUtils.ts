import { GameState } from "@/types/game";
import { EpisodeIT } from "@/types";

/**
 * Generate placeholder with underscores for a word
 */
export const generatePlaceholder = (word: string, input: string): string => {
  return word.split('').map((char, i) => {
    // If user has already typed this character
    if (input[i]) {
      return input[i];
    }

    // Otherwise show underscore
    return '_';
  }).join('');
};

/**
 * Find the next unguessed word index
 */
export const findNextUnguessedIndex = (
  currentIndex: number,
  currentSeasonIndex: number,
  guessedWords: Record<number, boolean[]>,
  isEpisodeBurned: (episodeIndex: number) => boolean,
  episodesLength: number
): number => {
  if (!guessedWords[currentSeasonIndex]) return -1;

  // Look for the next unguessed word
  for (let i = currentIndex + 1; i < episodesLength; i++) {
    if (!guessedWords[currentSeasonIndex][i] && !isEpisodeBurned(i)) {
      return i;
    }
  }

  // If no unguessed words after current index, look from the beginning
  for (let i = 0; i < currentIndex; i++) {
    if (!guessedWords[currentSeasonIndex][i] && !isEpisodeBurned(i)) {
      return i;
    }
  }

  return -1; // No unguessed words found
};

/**
 * Load game state from localStorage or use defaults
 */
export const loadGameState = (): GameState => {
  const savedState = localStorage.getItem('wordPuzzleGameState');
  if (savedState) {
    try {
      return JSON.parse(savedState);
    } catch (error) {
      console.error('Failed to parse saved game state:', error);
    }
  }
  return {
    currentSeasonIndex: 0,
    guessedWords: {},
    currentInputs: {},
    incorrectAttempts: {},
    seasonCompleted: {},
    showFullSentence: false
  };
};

/**
 * Save game state to localStorage
 */
export const saveGameState = (state: GameState): void => {
  localStorage.setItem('wordPuzzleGameState', JSON.stringify(state));
};

/**
 * Get remaining attempts for an episode
 */
export const getRemainingAttempts = (
  episodeIndex: number,
  currentSeasonIndex: number,
  incorrectAttempts: Record<number, number[]>,
  episode: EpisodeIT
): number => {
  const attempts = incorrectAttempts[currentSeasonIndex]?.[episodeIndex] || 0;
  return Math.max(0, episode.burnRight - attempts);
};

/**
 * Check if an episode is burned (no more attempts left)
 */
export const isEpisodeBurned = (
  episodeIndex: number,
  currentSeasonIndex: number,
  incorrectAttempts: Record<number, number[]>,
  episode: EpisodeIT
): boolean => {
  return getRemainingAttempts(episodeIndex, currentSeasonIndex, incorrectAttempts, episode) === 0;
};