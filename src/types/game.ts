import { EpisodeIT, SeasonIT } from "./index";

// Type for the game state that will be saved to localStorage
export interface GameState {
    currentSeasonIndex: number;
    guessedWords: Record<number, boolean[]>;
    currentInputs: Record<number, string[]>;
    incorrectAttempts: Record<number, number[]>;
    seasonCompleted: Record<number, boolean>;
    showFullSentence: boolean;
}

// Props for the WordPuzzleItem component
export interface WordPuzzleItemProps {
    episode: EpisodeIT;
    episodeIndex: number;
    isGuessed: boolean;
    isBurned: boolean;
    currentInput: string;
    inputRef: React.RefObject<HTMLInputElement | null>;
    remainingAttempts: number;
    hasIncorrectAttempts: boolean;
    onInputChange: (episodeIndex: number, value: string) => void;
    generatePlaceholder: (word: string, input: string) => string;
}

// Props for the SeasonNavigation component
export interface SeasonNavigationProps {
    currentSeasonIndex: number;
    totalSeasons: number;
    emoji: string;
    onPrevSeason: () => void;
    onNextSeason: () => void;
}

// Props for the CompletedSeason component
export interface CompletedSeasonProps {
    title: string;
    isCompleted: boolean;
    showFullSentence: boolean;
}

// Props for the WordPuzzleContainer component
export interface WordPuzzleContainerProps {
    currentSeason: SeasonIT;
    currentSeasonIndex: number;
    guessedWords: Record<number, boolean[]>;
    currentInputs: Record<number, string[]>;
    incorrectAttempts: Record<number, number[]>;
    inputRefs: Record<number, React.RefObject<HTMLInputElement | null>[]>;
    onInputChange: (episodeIndex: number, value: string) => void;
    isEpisodeBurned: (episodeIndex: number) => boolean;
    getRemainingAttempts: (episodeIndex: number) => number;
    generatePlaceholder: (word: string, input: string) => string;
}
