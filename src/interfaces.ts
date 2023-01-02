export interface Post {
  user: string;
  text: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  username: string;
  avatar: string;
  id: string;
  likes: string[];
}
