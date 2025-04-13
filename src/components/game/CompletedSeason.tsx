import React from "react";
import { motion } from "framer-motion";
import { CompletedSeasonProps } from "@/types/game";

/**
 * Component for displaying a completed season message
 */
export const CompletedSeason: React.FC<CompletedSeasonProps> = ({
  title,
  isCompleted,
  showFullSentence,
}) => {
  if (!showFullSentence || !isCompleted) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-primary-100 rounded-lg text-center"
    >
      <h2 className="text-2xl font-bold text-primary-800 mb-2 font-mono">
        {title}
      </h2>
      <p className="text-primary-600">
        Tebrikler! Bu sezonu tamamladınız.
      </p>
    </motion.div>
  );
};