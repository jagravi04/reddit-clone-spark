
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { mockCommunities, currentUser } from "@/data/mockData";
import { ImageIcon, Link as LinkIcon, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface CreatePostFormProps {
  onClose?: () => void;
  className?: string;
}

const CreatePostForm = ({ onClose, className }: CreatePostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [postType, setPostType] = useState("text");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isLoggedIn = !!currentUser;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast({
        title: "Login required",
        description: "You need to be logged in to create a post.",
        variant: "destructive"
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your post.",
        variant: "destructive"
      });
      return;
    }

    if (!communityId) {
      toast({
        title: "Community selection required",
        description: "Please select a community for your post.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    // In a real app, this would submit to an API
    setTimeout(() => {
      toast({
        title: "Post created!",
        description: "Your post has been created successfully."
      });
      setTitle("");
      setContent("");
      setCommunityId("");
      setImageUrl("");
      setLinkUrl("");
      setPostType("text");
      setIsSubmitting(false);
      if (onClose) onClose();
    }, 800);
  };

  return (
    <div className={className}>
      <h2 className="text-xl font-semibold mb-4">Create a post</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Select 
            value={communityId} 
            onValueChange={setCommunityId}
            disabled={!isLoggedIn || isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a community" />
            </SelectTrigger>
            <SelectContent>
              {mockCommunities.map((community) => (
                <SelectItem key={community.id} value={community.id}>
                  {community.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!isLoggedIn || isSubmitting}
            className="mb-2"
          />
        </div>
        
        <Tabs value={postType} onValueChange={setPostType} className="mb-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="text" className="flex items-center">
              <FileText size={16} className="mr-2" />
              Text
            </TabsTrigger>
            <TabsTrigger value="image" className="flex items-center">
              <ImageIcon size={16} className="mr-2" />
              Image
            </TabsTrigger>
            <TabsTrigger value="link" className="flex items-center">
              <LinkIcon size={16} className="mr-2" />
              Link
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="mt-4">
            <Textarea
              placeholder="Text (optional)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={!isLoggedIn || isSubmitting}
              className="min-h-[200px]"
            />
          </TabsContent>
          
          <TabsContent value="image" className="mt-4">
            <Input
              placeholder="Image URL (optional)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={!isLoggedIn || isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter a URL to an image, or upload an image (coming soon)
            </p>
          </TabsContent>
          
          <TabsContent value="link" className="mt-4">
            <Input
              placeholder="URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              disabled={!isLoggedIn || isSubmitting}
            />
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          {onClose && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
              className="mr-2"
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            disabled={!isLoggedIn || isSubmitting || !title.trim() || !communityId}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
