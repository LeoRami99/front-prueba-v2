import { create } from "zustand";

interface StepsState {
	step: number;
	setStep: (step: number) => void;
}
export const useSteps = create<StepsState>((set) => ({
	step: 1,
	setStep: (step: number) => set({ step }),
}));
