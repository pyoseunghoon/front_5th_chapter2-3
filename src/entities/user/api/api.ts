import { User, UserResponse } from '../model/type.ts';

export const fetchUser = async (): Promise<UserResponse> => {
  const response = await fetch('/api/users?limit=0&select=username,image');
  if (!response.ok) throw new Error('Fail to fetch user');
  return response.json();
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error('사용자 정보 가져오기 오류');
  return response.json();
};
