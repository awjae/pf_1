import create from 'zustand';

const useStore = create<any>((set) => ({
  text: 'React',
  rotateX: 0,
  rotateY: 0,
  setText: (text) => set({text}),
  setRotateX: (rotateX) => set({rotateX}),
  setRotateY: (rotateY) => set({rotateY}),
}));

export default useStore