import { create } from 'zustand';

interface Props {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

export const useLoading = create<Props>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),
}));
