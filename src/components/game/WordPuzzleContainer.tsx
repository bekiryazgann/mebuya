import React from "react";
import { WordPuzzleItem } from "./WordPuzzleItem";
import { WordPuzzleContainerProps } from "@/types/game";

/**
 * Container component for word puzzles
 */
export const WordPuzzleContainer: React.FC<WordPuzzleContainerProps> = ({
  currentSeason,
  currentSeasonIndex,
  guessedWords,
  currentInputs,
  incorrectAttempts,
  inputRefs,
  onInputChange,
  isEpisodeBurned,
  getRemainingAttempts,
  generatePlaceholder,
}) => {
  if (!currentSeason || !currentSeason.episodes) {
    return null;
  }

  return (
    <div className="mb-6 p-4 bg-primary-100 rounded-lg">
      {/* Horizontal word arrangement */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {currentSeason.episodes.map((episode, idx) => {
          const isGuessed = guessedWords[currentSeasonIndex]?.[idx];
          const isBurned = isEpisodeBurned(idx);
          const currentInput = currentInputs[currentSeasonIndex]?.[idx] || "";
          const remainingAttempts = getRemainingAttempts(idx);
          const hasIncorrectAttempts = incorrectAttempts[currentSeasonIndex]?.[idx] > 0;

          return (
            <WordPuzzleItem
              key={idx}
              episode={episode}
              episodeIndex={idx}
              isGuessed={isGuessed}
              isBurned={isBurned}
              currentInput={currentInput}
              inputRef={inputRefs[currentSeasonIndex]?.[idx]}
              remainingAttempts={remainingAttempts}
              hasIncorrectAttempts={hasIncorrectAttempts}
              onInputChange={onInputChange}
              generatePlaceholder={generatePlaceholder}
            />
          );
        })}
      </div>
    </div>
  );
};