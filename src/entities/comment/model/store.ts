import { create } from 'zustand';

interface Comment {
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

interface CommentState {
  comments: Record<string, Comment[]>;
  selectedComment: Comment | null;
  newComment: { body: string; postId: string | null; userId: number };
  showAddCommentDialog: boolean;
  showEditCommentDialog: boolean;

  setComments: (postId: string, comments: Comment[]) => void;
  addComment: (postId: string, comment: Comment) => void;
  updateComment: (postId: string, comment: Comment) => void;
  deleteComment: (postId: string, commentId: string) => void;

  setSelectedComment: (comment: Comment | null) => void;
  setNewComment: (newComment: {
    body: string;
    postId: string | null;
    userId: number;
  }) => void;

  openAddCommentDialog: (postId: string) => void;
  openEditCommentDialog: (comment: Comment) => void;
  closeCommentDialog: () => void;
}
export const useCommentStore = create<CommentState>((set) => ({
  comments: {},
  selectedComment: null,
  newComment: { body: '', postId: null, userId: 1 },
  showAddCommentDialog: false,
  showEditCommentDialog: false,

  setComments: (postId, comments) =>
    set((state) => ({
      comments: { ...state.comments, [postId]: comments },
    })),

  addComment: (postId, comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: [...(state.comments[postId] || []), comment],
      },
    })),

  updateComment: (postId, updatedComment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: state.comments[postId].map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment,
        ),
      },
    })),

  deleteComment: (postId, commentId) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: state.comments[postId].filter(
          (comment) => comment.id !== commentId,
        ),
      },
    })),

  setSelectedComment: (comment) => set({ selectedComment: comment }),

  setNewComment: (newComment) => set({ newComment }),

  openAddCommentDialog: (postId) =>
    set((state) => ({
      showAddCommentDialog: true,
      newComment: { ...state.newComment, postId },
    })),

  openEditCommentDialog: (comment) =>
    set(() => ({
      selectedComment: comment,
      showEditCommentDialog: true,
    })),

  closeCommentDialog: () =>
    set(() => ({
      showAddCommentDialog: false,
      showEditCommentDialog: false,
    })),
}));
