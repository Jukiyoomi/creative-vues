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

export interface IButtonProps {
  primary: boolean;
  classes: string;
  onClick: () => void;
  disabled: boolean;
}

export interface IPostProps {
  post: Post;
  isOnDashboard: boolean;
}
