import create from 'zustand';

const useStore = create<any>((set) => ({
  text: 'React',
  rotateX: 0,
  rotateY: 0,
  rightArmRotateY: 0,
  rightArmRotateZ: 0,
  setText: (text) => set({text}),
  setRotateX: (rotateX) => set({rotateX}),
  setRotateY: (rotateY) => set({rotateY}),
  setRightArmRotateY: (rightArmRotateY) => set({rightArmRotateY}),
  setRightArmRotateZ: (rightArmRotateZ) => set({rightArmRotateZ}),
}));

export default useStore