import { createTransaction } from "../services/transaction.service";

import { ITransaction } from "@/app/types/transaction";

import { useMutation } from "@tanstack/react-query";

export const useCreateTransaction = () => {
	return useMutation({
		mutationFn: (data: ITransaction) => createTransaction(data),
	});
};
