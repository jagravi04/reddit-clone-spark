
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import CreatePostForm from "@/components/CreatePostForm";
import { mockPosts } from "@/data/mockData";
import { SortOption } from "@/types";
import { ArrowDownNarrowWide, Flame, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Index = () => {
  const [sortOption, setSortOption] = useState<SortOption>("hot");
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  // Sort posts based on the selected option
  const sortedPosts = [...mockPosts].sort((a, b) => {
    if (sortOption === "new") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOption === "top") {
      return b.voteScore - a.voteScore;
    }
    // Default "hot" sorting (combination of score and recency)
    const hotScoreA = a.voteScore / (1 + (Date.now() - new Date(a.createdAt).getTime()) / 36000000);
    const hotScoreB = b.voteScore / (1 + (Date.now() - new Date(b.createdAt).getTime()) / 36000000);
    return hotScoreB - hotScoreA;
  });

  const renderSortIcon = () => {
    switch (sortOption) {
      case "hot":
        return <Flame size={16} />;
      case "new":
        return <Clock size={16} />;
      case "top":
        return <ArrowDownNarrowWide size={16} />;
      default:
        return <Flame size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-reddit-secondary">
      <Navbar />

      <main className="container mx-auto px-4 py-6 flex">
        {/* Main content */}
        <div className="flex-1 space-y-4">
          {/* Create post card */}
          <Card className="p-4">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                className="flex-1 justify-start bg-gray-100" 
                onClick={() => setIsCreatePostModalOpen(true)}
              >
                Create Post
              </Button>
            </div>
          </Card>

          {/* Sort options */}
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {renderSortIcon()}
                  <span className="ml-2 font-medium">SORT</span>
                </div>
                <Select
                  value={sortOption}
                  onValueChange={(value) => setSortOption(value as SortOption)}
                >
                  <SelectTrigger className="w-[100px] border-none shadow-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot">Hot</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="top">Top</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="ghost" size="sm" asChild>
                <Link to="/communities">View All Communities</Link>
              </Button>
            </div>
          </div>

          {/* Post list */}
          <div className="space-y-4">
            {sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="ml-6">
          <Sidebar />
        </div>
      </main>

      {/* Create Post Modal */}
      <Dialog open={isCreatePostModalOpen} onOpenChange={setIsCreatePostModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <CreatePostForm onClose={() => setIsCreatePostModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
