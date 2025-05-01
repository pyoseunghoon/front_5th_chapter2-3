export interface CommentResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

export type AddCommentResponse = Omit<Comment, 'likes'>;

export interface Comment {
  id: string;
  body: string;
  postId: string | null;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}
