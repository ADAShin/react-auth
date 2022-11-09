import apiClient from './apiClient';
import type { PlaceHolderTodo, PlaceHolderUser } from './type';

export const fetchUsers = async () => {
  const res = await apiClient.get<PlaceHolderUser[]>('/users');
  return res.data;
};

export const fetchTodos = async () => {
  const res = await apiClient.get<PlaceHolderTodo[]>('/todos');
  return res.data;
};
