import React from "react";
import { Input } from "@/components/ui/input";
import { WordPuzzleItemProps } from "@/types/game";

/**
 * Component for displaying an individual word puzzle item
 */
export const WordPuzzleItem: React.FC<WordPuzzleItemProps> = ({
  episode,
  episodeIndex,
  isGuessed,
  isBurned,
  currentInput,
  inputRef,
  remainingAttempts,
  hasIncorrectAttempts,
  onInputChange,
  generatePlaceholder,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onInputChange(episodeIndex, e.target.value);
  };

  return (
    <div className="flex flex-col items-center mb-4 mx-1">
      {/* Word display */}
      <div 
        className={`text-lg font-medium mb-2 font-mono ${
          isBurned && !isGuessed ? 'text-red-600' : 'text-primary-800'
        }`}
      >
        {isGuessed 
          ? episode.word 
          : isBurned
            ? episode.word // Show the word if burned
            : generatePlaceholder(episode.word, currentInput)
        }
      </div>

      {/* Input field aligned with the word */}
      {!isGuessed && !isBurned && (
        <div className="w-full">
          <Input
            ref={inputRef}
            value={currentInput}
            onChange={handleChange}
            placeholder={`${episode.length} harf`}
            className="w-full bg-primary-300 text-primary-900 placeholder:text-primary-700 text-center font-mono"
          />

          {/* Remaining attempts */}
          <div className="text-xs text-primary-600 mt-1 text-center">
            Kalan: {remainingAttempts}
          </div>

          {/* Error message */}
          {hasIncorrectAttempts && (
            <div className="text-xs text-red-600 mt-1 text-center">
              Yanlış!
            </div>
          )}
        </div>
      )}

      {/* Word hint */}
      <div className="text-xs text-primary-600 italic mt-1 max-w-32 text-center font-mono">
        {episode.guessSentence}
      </div>
    </div>
  );
};