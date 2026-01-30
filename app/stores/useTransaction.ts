import { create } from "zustand";

interface TransactionState {
	amount: number;
	userId: "f6f51b8f-8b6f-4e7e-93f0-12c0fbde12c1";
	methodPayment: "CARD";
	productId: string;
	price: number;
	referenceInternalTransaction: "string";
	idExternalTransaction: "string";
	token_card: string;
	acceptance_token: string;
	installments: number;

	setTokenCard: (token_card: string) => void;
	setProductId: (productId: string) => void;
	setAmount: (amount: number) => void;
	setAcceptanceToken: (acceptance_token: string) => void;
	setInstallments: (installments: number) => void;
	setPrice: (price: number) => void;
}

export const useTransactionParams = create<TransactionState>((set) => ({
	amount: 0,
	userId: "f6f51b8f-8b6f-4e7e-93f0-12c0fbde12c1",
	methodPayment: "CARD",
	productId: "",
	price: 0,
	referenceInternalTransaction: "string",
	idExternalTransaction: "string",
	token_card: "",
	acceptance_token: "",
	installments: 1,

	setPrice: (price: number) => set({ price }),
	setTokenCard: (token_card: string) => set({ token_card }),
	setProductId: (productId: string) => set({ productId }),
	setAmount: (amount: number) => set({ amount }),
	setAcceptanceToken: (acceptance_token: string) => set({ acceptance_token }),
	setInstallments: (installments: number) => set({ installments }),
}));
