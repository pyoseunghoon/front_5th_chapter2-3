import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addComment,
  updateComment,
  deleteComment,
  likeComment,
} from '../../../entities/comment/api/api';
import { useCommentStore } from '../../../entities/comment/model/store';

// 댓글 추가
export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();
  const { closeCommentDialog, setNewComment } = useCommentStore();

  return useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.postId] });
      closeCommentDialog();
      setNewComment({ body: '', postId: null, userId: 1 });
    },
  });
};

// 댓글 수정
export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();
  const { closeCommentDialog } = useCommentStore();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: string }) =>
      updateComment(id, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['comments', data.postId] });
      closeCommentDialog();
    },
  });
};

// 댓글 삭제
export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, postId }: { id: string; postId: string }) =>
      deleteComment(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.postId],
      });
    },
  });
};

export const useLikeCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, likes }: { id: string; likes: number }) =>
      likeComment(id, likes),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', data.postId],
      });
    },
  });
};
