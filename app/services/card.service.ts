import axiosInstance from "../config/axios.config";
import { CreditCard } from "../types/credit-card";

export const getTokenCard = async (cardData: CreditCard) => {
	try {
		const { number, ...restCardData } = cardData;
		const parceCardNumber = number.toString().replace(/\s+/g, "");
		const response = await axiosInstance.post("cards/token", {
			...restCardData,
			number: parceCardNumber,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
