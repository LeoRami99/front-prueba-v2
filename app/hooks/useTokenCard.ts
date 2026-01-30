import { getTokenCard } from "../services/card.service";
import { useMutation } from "@tanstack/react-query";
import { CreditCard } from "../types/credit-card";

export const useTokenCard = () => {
	return useMutation({
		mutationFn: (data: CreditCard) => getTokenCard(data),
	});
};
