import axiosInstance from "../config/axios.config";

export const getProducts = async (page = 1, pageSize = 10, filter = "") => {
	try {
		const response = await axiosInstance.get(`/products`, {
			params: {
				page,
				pageSize,
				filter,
			},
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
