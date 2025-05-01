import { create } from 'zustand';
import { PostUIState } from './type';

export const usePostUIStore = create<PostUIState>((set) => ({
  selectedPost: null,
  isAddDialogOpen: false,
  isEditDialogOpen: false,

  openAddDialog: () =>
    set({ isAddDialogOpen: true, isEditDialogOpen: false, selectedPost: null }),
  openEditDialog: (post) =>
    set({ isEditDialogOpen: true, isAddDialogOpen: false, selectedPost: post }),
  closeDialog: () =>
    set({
      isAddDialogOpen: false,
      isEditDialogOpen: false,
      selectedPost: null,
    }),
  setSelectedPost: (post) => set({ selectedPost: post }),
}));
