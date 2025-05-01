import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../../../entities/post/api/api.ts';
import { fetchUser } from '../../../entities/user/api/api.ts';
import { Post, PostResponse } from '../../../entities/post/model/type.ts';
import { User, UserResponse } from '../../../entities/user/model/type.ts';

export const usePostList = (limit: number, skip: number) => {
  return useQuery({
    queryKey: ['postList', limit, skip],
    queryFn: async () => {
      const postResponse: PostResponse = await fetchPosts(limit, skip);
      const userResponse: UserResponse = await fetchUser();

      const postsWithAuthor = postResponse.posts.map((post: Post) => ({
        ...post,
        author: userResponse.users.find(
          (user: User) => user.id === post.userId,
        ),
      }));

      return {
        posts: postsWithAuthor,
        total: postResponse.total,
      };
    },
    staleTime: 1000 * 60 * 5,
  });
};
