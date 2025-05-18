
import React, { useState } from "react";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  score: number;
  userVote?: 'up' | 'down' | null;
  orientation?: 'vertical' | 'horizontal';
  onVote?: (direction: 'up' | 'down') => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const VoteButtons = ({
  score,
  userVote,
  orientation = 'vertical',
  onVote,
  size = 'md',
  className
}: VoteButtonsProps) => {
  const [vote, setVote] = useState<'up' | 'down' | null>(userVote || null);
  const [voteScore, setVoteScore] = useState(score);

  const handleVote = (direction: 'up' | 'down') => {
    // If clicking the same button, remove vote
    if (vote === direction) {
      setVote(null);
      setVoteScore(direction === 'up' ? voteScore - 1 : voteScore + 1);
    } 
    // If switching vote direction
    else if (vote !== null) {
      setVote(direction);
      setVoteScore(direction === 'up' ? voteScore + 2 : voteScore - 2);
    } 
    // New vote
    else {
      setVote(direction);
      setVoteScore(direction === 'up' ? voteScore + 1 : voteScore - 1);
    }

    if (onVote) {
      onVote(direction);
    }
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 26,
  };

  return (
    <div className={cn(
      "flex items-center",
      orientation === 'vertical' ? "flex-col" : "flex-row",
      sizeClasses[size],
      className
    )}>
      <button
        onClick={() => handleVote('up')}
        className={cn(
          "hover:bg-gray-100 rounded-full p-1",
          vote === 'up' ? "text-reddit-upvote" : "text-gray-500"
        )}
      >
        <ArrowUpCircle size={iconSizes[size]} />
      </button>
      
      <span className={cn(
        "mx-1 font-semibold",
        vote === 'up' ? "text-reddit-upvote" : 
        vote === 'down' ? "text-reddit-downvote" : "text-gray-800"
      )}>
        {voteScore}
      </span>
      
      <button
        onClick={() => handleVote('down')}
        className={cn(
          "hover:bg-gray-100 rounded-full p-1",
          vote === 'down' ? "text-reddit-downvote" : "text-gray-500"
        )}
      >
        <ArrowDownCircle size={iconSizes[size]} />
      </button>
    </div>
  );
};

export default VoteButtons;
