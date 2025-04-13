import React from "react";
import { Button } from "@/components/ui/button";
import { SeasonNavigationProps } from "@/types/game";

/**
 * Component for navigating between seasons
 */
export const SeasonNavigation: React.FC<SeasonNavigationProps> = ({
  currentSeasonIndex,
  totalSeasons,
  emoji,
  onPrevSeason,
  onNextSeason,
}) => {
  return (
    <div className="flex justify-between mb-4">
      <Button 
        variant="outline" 
        onClick={onPrevSeason}
        disabled={currentSeasonIndex === 0}
        className="bg-primary-300 hover:bg-primary-400 text-primary-900"
      >
        Önceki Sezon
      </Button>
      <div className="text-4xl">{emoji}</div>
      <Button 
        variant="outline" 
        onClick={onNextSeason}
        disabled={currentSeasonIndex === totalSeasons - 1}
        className="bg-primary-300 hover:bg-primary-400 text-primary-900"
      >
        Sonraki Sezon
      </Button>
    </div>
  );
};