import { Post, PostResponse } from '../model/type.ts';

// 게시물 가져오기
export const fetchPosts = async (
  limit: number,
  skip: number,
): Promise<PostResponse> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error('Fail to fetch posts');
  return response.json();
};

// 태그별 게시물 가져오기
export const fetchPostsByTag = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`);
  if (!response.ok) throw new Error('Fail to fetchPostsByTag');
  return response.json();
};

// 게시물 추가
export const addPost = async (
  newPost: Omit<Post, 'id' | 'reactions' | 'views'>,
) => {
  const response = await fetch(`/api/posts/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) throw new Error('Fail to addPost');
  return response.json();
};

// 게시물 업데이트
export const updatePost = async (selectedPost: Post) => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(selectedPost),
  });
  if (!response.ok) throw new Error('Fail to updatePost');
  return response.json();
};

// 게시물 삭제
export const deletePost = async (id: number) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('게시물 삭제 오류:', error);
  }
};

// 태그 가져오기
export const fetchTag = async () => {
  const response = await fetch('/api/posts/tags');
  if (!response.ok) throw new Error('태그 가져오기 오류');
  return response.json();
};
