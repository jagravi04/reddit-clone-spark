
import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Clock } from "lucide-react";
import { Post } from "@/types";
import VoteButtons from "./VoteButtons";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  showCommunity?: boolean;
  compact?: boolean;
  className?: string;
}

const PostCard = ({ post, showCommunity = true, compact = false, className }: PostCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <div className={cn(
      "bg-white rounded-md border border-gray-200 hover-card-effect",
      compact ? "p-2" : "p-3",
      className
    )}>
      <div className="flex">
        <div className="mr-2">
          <VoteButtons 
            score={post.voteScore} 
            userVote={post.userVote} 
            size={compact ? "sm" : "md"}
          />
        </div>
        <div className="flex-grow">
          {/* Post header */}
          <div className="flex items-center text-xs text-gray-500 mb-1">
            {showCommunity && (
              <>
                <Link to={`/r/${post.communityId}`} className="font-medium text-black hover:underline mr-1">
                  {post.communityName}
                </Link>
                <span className="mx-1">•</span>
              </>
            )}
            <span className="flex items-center">
              Posted by{" "}
              <Link to={`/user/${post.authorId}`} className="hover:underline mx-1">
                u/{post.author.username}
              </Link>
            </span>
            <span className="flex items-center ml-1">
              <Clock size={12} className="mr-1" />
              {formattedDate}
            </span>
          </div>

          {/* Post title */}
          <Link to={`/post/${post.id}`}>
            <h2 className={cn(
              "font-medium text-gray-900 hover:text-reddit-primary",
              compact ? "text-base" : "text-lg"
            )}>
              {post.title}
            </h2>
          </Link>

          {/* Post content */}
          {!compact && (
            <div className="mt-2 text-gray-800">
              {post.content.length > 200 
                ? `${post.content.substring(0, 200)}...` 
                : post.content}
              
              {post.imageUrl && (
                <div className="mt-3">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="max-h-96 object-contain rounded-md"
                  />
                </div>
              )}
            </div>
          )}

          {/* Post footer */}
          <div className="flex items-center mt-2 text-xs text-gray-500">
            <Link to={`/post/${post.id}`} className="flex items-center hover:bg-gray-100 rounded-full px-2 py-1">
              <MessageSquare size={16} className="mr-1" />
              {post.commentCount} {post.commentCount === 1 ? 'comment' : 'comments'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
