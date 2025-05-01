import { AddCommentResponse, Comment, CommentResponse } from '../model/type.ts';

export const fetchCommentsByPostId = async (postId: string) => {
  const res = await fetch(`/api/comments/post/${postId}`);
  if (!res.ok) throw new Error('댓글 불러오기 실패');
  return res.json();
};

export const addComment = async (comment: {
  body: string;
  postId: string;
  userId: number;
}): Promise<AddCommentResponse> => {
  const res = await fetch(`/api/comments/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  if (!res.ok) throw new Error('댓글 추가 실패');
  return res.json();
};

export const updateComment = async (
  id: string,
  body: string,
): Promise<Comment> => {
  const res = await fetch(`/api/comments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body }),
  });
  if (!res.ok) throw new Error('댓글 업데이트 실패');
  return res.json();
};

export const deleteComment = async (id: string): Promise<Comment> => {
  const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('댓글 삭제 실패');
};

export const likeComment = async (id: string, likes: number) => {
  const res = await fetch(`/api/comments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes }),
  });
  if (!res.ok) throw new Error('댓글 좋아요 실패');
  return res.json();
};
