import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addPost,
  updatePost,
  deletePost,
} from '../../../entities/post/api/api';
import { Post } from '../../../entities/post/model/type';

export const usePostActions = () => {
  const queryClient = useQueryClient();

  // 게시물 추가
  const addPostMutation = useMutation({
    mutationFn: (newPost: Omit<Post, 'id' | 'reactions' | 'views'>) =>
      addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // 게시물 수정
  const updatePostMutation = useMutation({
    mutationFn: (post: Post) => updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // 게시물 삭제
  const deletePostMutation = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return {
    addPostMutation,
    updatePostMutation,
    deletePostMutation,
  };
};
