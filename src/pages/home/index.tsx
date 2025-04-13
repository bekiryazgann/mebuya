import {useState, useEffect, createRef, JSX} from "react";
import { seasons } from "@/data/seasons";
import { Card } from "@/components/ui/card";
import { AnimatePresence } from "framer-motion";
import { SeasonNavigation } from "@/components/game/SeasonNavigation";
import { CompletedSeason } from "@/components/game/CompletedSeason";
import { WordPuzzleContainer } from "@/components/game/WordPuzzleContainer";
import { GameState } from "@/types/game";
import {
    generatePlaceholder,
    findNextUnguessedIndex,
    loadGameState,
    saveGameState,
    getRemainingAttempts as getAttempts,
    isEpisodeBurned as checkEpisodeBurned
} from "@/utils/gameUtils";

export default function HomePage(): JSX.Element {
    // Initialize state from localStorage or defaults
    const initialState = loadGameState();

    const [currentSeasonIndex, setCurrentSeasonIndex] = useState(initialState.currentSeasonIndex);
    const [guessedWords, setGuessedWords] = useState<Record<number, boolean[]>>(initialState.guessedWords);
    const [currentInputs, setCurrentInputs] = useState<Record<number, string[]>>(initialState.currentInputs);
    const [incorrectAttempts, setIncorrectAttempts] = useState<Record<number, number[]>>(initialState.incorrectAttempts);
    const [seasonCompleted, setSeasonCompleted] = useState<Record<number, boolean>>(initialState.seasonCompleted);
    const [showFullSentence, setShowFullSentence] = useState(initialState.showFullSentence);
    const [inputRefs, setInputRefs] = useState<Record<number, React.RefObject<HTMLInputElement>[]>>({});

    const currentSeason = seasons[currentSeasonIndex];

    // Initialize state for the current season if not already initialized
    useEffect(() => {
        if (!guessedWords[currentSeasonIndex]) {
            setGuessedWords(prev => ({
                ...prev,
                [currentSeasonIndex]: Array(currentSeason.episodes.length).fill(false)
            }));
        }

        if (!currentInputs[currentSeasonIndex]) {
            setCurrentInputs(prev => ({
                ...prev,
                [currentSeasonIndex]: Array(currentSeason.episodes.length).fill("")
            }));
        }

        if (!incorrectAttempts[currentSeasonIndex]) {
            setIncorrectAttempts(prev => ({
                ...prev,
                [currentSeasonIndex]: Array(currentSeason.episodes.length).fill(0)
            }));
        }

        if (seasonCompleted[currentSeasonIndex] === undefined) {
            setSeasonCompleted(prev => ({
                ...prev,
                [currentSeasonIndex]: false
            }));
        }

        // Initialize input refs for the current season
        if (!inputRefs[currentSeasonIndex]) {
            const refs = currentSeason.episodes.map(() => createRef<HTMLInputElement>());
            setInputRefs(prev => ({
                ...prev,
                [currentSeasonIndex]: refs
            }));
        }
    }, [
        currentSeasonIndex,
        currentSeason,
        guessedWords,
        currentInputs,
        incorrectAttempts,
        seasonCompleted
    ]);

    // Check if all words in the current season have been guessed
    useEffect(() => {
        if (guessedWords[currentSeasonIndex] &&
            guessedWords[currentSeasonIndex].every(guessed => guessed)) {
            setSeasonCompleted(prev => ({
                ...prev,
                [currentSeasonIndex]: true
            }));
            setShowFullSentence(true);
        }
    }, [guessedWords, currentSeasonIndex, setSeasonCompleted, setShowFullSentence]);

    // Save game state to localStorage whenever state changes
    useEffect(() => {
        const gameState: GameState = {
            currentSeasonIndex,
            guessedWords,
            currentInputs,
            incorrectAttempts,
            seasonCompleted,
            showFullSentence
        };
        saveGameState(gameState);
    }, [currentSeasonIndex, guessedWords, currentInputs, incorrectAttempts, seasonCompleted, showFullSentence]);

    const handleInputChange = (episodeIndex: number, value: string): void => {
        setCurrentInputs(prev => {
            const newInputs = { ...prev };
            newInputs[currentSeasonIndex][episodeIndex] = value;
            return newInputs;
        });

        // Real-time validation
        const episode = currentSeason.episodes[episodeIndex];
        const input = value.trim();

        if (input.toLowerCase() === episode.word.toLowerCase()) {
            // Correct guess
            setGuessedWords(prev => {
                const newGuessed = { ...prev };
                newGuessed[currentSeasonIndex][episodeIndex] = true;
                return newGuessed;
            });

            // Find the next unguessed word and focus on its input
            const nextUnguessedIndex = findNextUnguessedWordIndex(episodeIndex);
            if (nextUnguessedIndex !== -1) {
                setTimeout(() => {
                    inputRefs[currentSeasonIndex]?.[nextUnguessedIndex]?.current?.focus();
                }, 100);
            }
        } else if (input.length === episode.word.length) {
            // Incorrect guess (only count when length matches)
            setIncorrectAttempts(prev => {
                const newAttempts = { ...prev };
                // Get the current value, ensure it's a number, and add exactly 1
                const currentValue = newAttempts[currentSeasonIndex][episodeIndex] || 0;
                newAttempts[currentSeasonIndex][episodeIndex] = currentValue + 1;
                return newAttempts;
            });

            // Clear input field after incorrect guess
            setCurrentInputs(prev => {
                const newInputs = { ...prev };
                newInputs[currentSeasonIndex][episodeIndex] = "";
                return newInputs;
            });
        }
    };

    // Find the next unguessed word index with the utility function
    const findNextUnguessedWordIndex = (currentIndex: number): number => {
        return findNextUnguessedIndex(
            currentIndex,
            currentSeasonIndex,
            guessedWords,
            isEpisodeBurned,
            currentSeason.episodes.length
        );
    };

    const handleNextSeason = (): void => {
        // Allow proceeding to the next season regardless of completion
        if (currentSeasonIndex < seasons.length - 1) {
            setShowFullSentence(false);
            setCurrentSeasonIndex(prev => prev + 1);
        }
    };

    const handlePrevSeason = (): void => {
        if (currentSeasonIndex > 0) {
            setShowFullSentence(false);
            setCurrentSeasonIndex(prev => prev - 1);
        }
    };

    const getRemainingAttempts = (episodeIndex: number): number => {
        const episode = currentSeason.episodes[episodeIndex];
        return getAttempts(
            episodeIndex,
            currentSeasonIndex,
            incorrectAttempts,
            episode
        );
    };

    const isEpisodeBurned = (episodeIndex: number): boolean => {
        const episode = currentSeason.episodes[episodeIndex];
        return checkEpisodeBurned(
            episodeIndex,
            currentSeasonIndex,
            incorrectAttempts,
            episode
        );
    };

    return (
        <div className="p-6 bg-secondary">
            <div className="mb-8 text-center">
                <p className="text-primary-600">
                    Sezon {currentSeasonIndex + 1} / {seasons.length}
                </p>
            </div>

            <Card className="p-6 mb-6 bg-white shadow-lg rounded-xl">
                <SeasonNavigation
                    currentSeasonIndex={currentSeasonIndex}
                    totalSeasons={seasons.length}
                    emoji={currentSeason.emoji}
                    onPrevSeason={handlePrevSeason}
                    onNextSeason={handleNextSeason}
                />

                <AnimatePresence>
                    <CompletedSeason
                        title={currentSeason.title}
                        isCompleted={seasonCompleted[currentSeasonIndex] || false}
                        showFullSentence={showFullSentence}
                    />
                </AnimatePresence>

                {/* Display sentence with placeholders and aligned input fields */}
                {!showFullSentence && (
                    <WordPuzzleContainer
                        currentSeason={currentSeason}
                        currentSeasonIndex={currentSeasonIndex}
                        guessedWords={guessedWords}
                        currentInputs={currentInputs}
                        incorrectAttempts={incorrectAttempts}
                        inputRefs={inputRefs}
                        onInputChange={handleInputChange}
                        isEpisodeBurned={isEpisodeBurned}
                        getRemainingAttempts={getRemainingAttempts}
                        generatePlaceholder={generatePlaceholder}
                    />
                )}
            </Card>

            <div className="text-center text-sm text-primary-600">
                Romantik cümleyi görmek için tüm kelimeleri tahmin edin!
            </div>
        </div>
    );
}
