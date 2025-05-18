
import React, { useState } from "react";
import { Comment as CommentType } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import VoteButtons from "./VoteButtons";
import { currentUser } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface CommentSectionProps {
  postId: string;
  comments: CommentType[];
  className?: string;
}

const CommentSection = ({ postId, comments, className }: CommentSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isLoggedIn = !!currentUser;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "You need to be logged in to comment.",
        variant: "destructive"
      });
      return;
    }

    if (!commentText.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter some text for your comment.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    // In a real app, this would submit to an API
    setTimeout(() => {
      toast({
        title: "Comment posted!",
        description: "Your comment has been added successfully."
      });
      setCommentText("");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className={className}>
      {/* Comment form */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <Textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={isLoggedIn ? "What are your thoughts?" : "Please login to comment"}
          className="mb-2 min-h-[100px]"
          disabled={!isLoggedIn || isSubmitting}
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!isLoggedIn || isSubmitting || !commentText.trim()}
          >
            {isSubmitting ? "Posting..." : "Comment"}
          </Button>
        </div>
      </form>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <span className="font-medium text-black">u/{comment.author.username}</span>
                <span className="mx-2">•</span>
                <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
              </div>
              <div className="flex">
                <div className="mr-2">
                  <VoteButtons 
                    score={comment.voteScore} 
                    userVote={comment.userVote} 
                    size="sm" 
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-gray-800">{comment.content}</p>
                  <div className="flex mt-1 text-xs text-gray-500">
                    <button className="hover:text-reddit-primary mr-2">Reply</button>
                    <button className="hover:text-reddit-primary">Report</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
