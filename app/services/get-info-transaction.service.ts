import axiosInstance from "../config/axios.config";

export const getInfoTransaction = async (idInternalTransaction: string) => {
	try {
		const response = await axiosInstance.get(`/transactions/internal/${idInternalTransaction}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
