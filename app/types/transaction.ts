export interface ITransaction {
	amount: number;
	userId: string;
	methodPayment: "CARD";
	productId: string;
	price: number;
	referenceInternalTransaction?: string;
	idExternalTransaction?: string;
	token_card: string;
	acceptance_token: string;
	installments: number;
}
