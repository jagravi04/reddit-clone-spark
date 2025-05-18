
export interface User {
  id: string;
  username: string;
  avatarUrl?: string;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  description?: string;
  members: number;
  imageUrl?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  communityId: string;
  communityName: string;
  authorId: string;
  author: User;
  voteScore: number;
  commentCount: number;
  createdAt: string;
  userVote?: 'up' | 'down' | null;
}

export interface Comment {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  author: User;
  createdAt: string;
  voteScore: number;
  userVote?: 'up' | 'down' | null;
}

export type SortOption = 'hot' | 'new' | 'top';
