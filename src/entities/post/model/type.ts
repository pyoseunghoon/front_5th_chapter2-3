export interface PostResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export type Post = {
  id: number;
  title: string;
  body: string;
  reactions: Reaction;
  tages: string[];
  userId: number;
  views: number;
};

export type Reaction = {
  likes: number;
  dislikes: number;
};

export interface PostUIState {
  selectedPost: Post | null;
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  openAddDialog: () => void;
  openEditDialog: (post: Post) => void;
  closeDialog: () => void;
  setSelectedPost: (post: Post | null) => void;
}

export interface TagResponse {
  tags: Tag[];
}
export interface Tag {
  slug: string;
  name: string;
  url: string;
}
