import create from 'zustand';

const useStore = create<any>((set) => ({
  text: 'React',
  initX: 0,
  rotateX: 0,
  setText: (text) => set({text}),
  setInitX: (initX) => set({initX}),
  setRotateX: (rotateX) => set({rotateX}),
}));

export default useStore