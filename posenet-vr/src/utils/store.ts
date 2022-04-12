import create from 'zustand';

const useStore = create<any>((set) => ({
  text: 'React',
  setText: (text) => set({text}),
}));

export default useStore