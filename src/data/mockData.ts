
import { User, Community, Post, Comment } from "../types";

export const mockUsers: User[] = [
  {
    id: "1",
    username: "johndoe",
    avatarUrl: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    username: "janedoe",
    avatarUrl: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "3",
    username: "alex_smith",
    avatarUrl: "https://i.pravatar.cc/150?img=3"
  }
];

export const mockCommunities: Community[] = [
  {
    id: "1",
    name: "r/programming",
    slug: "programming",
    description: "Computer programming discussions and news",
    members: 3400000,
    imageUrl: "https://styles.redditmedia.com/t5_2fwo/styles/communityIcon_we3ifu7in9o11.png"
  },
  {
    id: "2",
    name: "r/webdev",
    slug: "webdev",
    description: "A community dedicated to all things web development",
    members: 900000,
    imageUrl: "https://styles.redditmedia.com/t5_2qs0q/styles/communityIcon_kxcmkl23xmq41.png"
  },
  {
    id: "3",
    name: "r/reactjs",
    slug: "reactjs",
    description: "A community for learning and developing web applications using React",
    members: 300000,
    imageUrl: "https://styles.redditmedia.com/t5_2zldd/styles/communityIcon_fbblpo38vy941.png"
  },
  {
    id: "4",
    name: "r/typescript",
    slug: "typescript",
    description: "TypeScript discussions, articles, and tutorials",
    members: 150000,
    imageUrl: "https://styles.redditmedia.com/t5_3o4km/styles/communityIcon_kcz4ohsn1esb.png"
  },
  {
    id: "5",
    name: "r/nextjs",
    slug: "nextjs",
    description: "A community for Next.js developers",
    members: 80000,
    imageUrl: "https://styles.redditmedia.com/t5_3mttr/styles/communityIcon_91uvx9cnavf51.png"
  }
];

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "How to properly structure a React project?",
    content: "I'm starting a new React project and I'd like to know what folder structure you all use. What has worked well for you in larger projects?",
    communityId: "3",
    communityName: "r/reactjs",
    authorId: "1",
    author: mockUsers[0],
    voteScore: 243,
    commentCount: 56,
    createdAt: "2023-05-15T13:45:30Z"
  },
  {
    id: "2",
    title: "TypeScript 5.0 Released - What are the best new features?",
    content: "TypeScript 5.0 was just released with some exciting features. What are your thoughts on the new additions?",
    communityId: "4",
    communityName: "r/typescript",
    authorId: "2",
    author: mockUsers[1],
    voteScore: 892,
    commentCount: 124,
    createdAt: "2023-05-16T09:23:15Z",
    userVote: "up"
  },
  {
    id: "3",
    title: "Show: I built a Reddit clone with Next.js",
    imageUrl: "https://preview.redd.it/m4nclpipvcz51.png?width=640&crop=smart&auto=webp&s=e94335c511c0ddb4b58669ef6fabbbe17ce39188",
    content: "After months of work, I've finally completed my Reddit clone built with Next.js, TypeScript, and Tailwind CSS. Check it out!",
    communityId: "5",
    communityName: "r/nextjs",
    authorId: "3",
    author: mockUsers[2],
    voteScore: 1532,
    commentCount: 89,
    createdAt: "2023-05-14T18:12:45Z",
    userVote: "up"
  },
  {
    id: "4",
    title: "Best practices for API authentication in 2023",
    content: "What are the current best practices for API authentication? JWT? OAuth? Something else?",
    communityId: "2",
    communityName: "r/webdev",
    authorId: "1",
    author: mockUsers[0],
    voteScore: 427,
    commentCount: 67,
    createdAt: "2023-05-17T10:05:22Z"
  },
  {
    id: "5",
    title: "Python vs JavaScript in 2023 - what's your take?",
    content: "I'm curious about the community's thoughts on Python vs JavaScript in 2023. Which one do you prefer and why?",
    communityId: "1",
    communityName: "r/programming",
    authorId: "2",
    author: mockUsers[1],
    voteScore: 762,
    commentCount: 201,
    createdAt: "2023-05-13T14:28:55Z",
    userVote: "down"
  }
];

export const mockComments: Comment[] = [
  {
    id: "1",
    content: "I've had success with a feature-based structure rather than the traditional components/pages split.",
    postId: "1",
    authorId: "2",
    author: mockUsers[1],
    createdAt: "2023-05-15T14:12:30Z",
    voteScore: 42
  },
  {
    id: "2",
    content: "I recommend the Atomic Design pattern, it's been working great for our team on enterprise apps.",
    postId: "1",
    authorId: "3",
    author: mockUsers[2],
    createdAt: "2023-05-15T14:45:22Z",
    voteScore: 28
  },
  {
    id: "3",
    content: "The decorators in TypeScript 5 are finally out of experimental mode, and the new const type parameters are game-changing for generics!",
    postId: "2",
    authorId: "1",
    author: mockUsers[0],
    createdAt: "2023-05-16T09:45:11Z",
    voteScore: 56
  }
];

export const currentUser: User | null = {
  id: "1",
  username: "johndoe",
  avatarUrl: "https://i.pravatar.cc/150?img=1"
};
