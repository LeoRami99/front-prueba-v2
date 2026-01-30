import axiosInstance from "../config/axios.config";
import { ITransaction } from "../types/transaction";

export const createTransaction = async (data: ITransaction) => {
	try {
		const response = await axiosInstance.post("/transactions", data);
		return response.data;
	} catch (error) {
		throw error;
	}
};
