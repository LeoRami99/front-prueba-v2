import { getInfoTransaction } from "@/app/services/get-info-transaction.service";
import { useQuery } from "@tanstack/react-query";

export const useGetInfoTransaction = (idInternalTransaction: string) => {
	return useQuery({
		queryKey: ["info-transaction", idInternalTransaction],
		queryFn: () => getInfoTransaction(idInternalTransaction),
		enabled: !!idInternalTransaction,
	});
};
