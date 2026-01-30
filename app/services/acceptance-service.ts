import axios from "axios";

const pub_key = process.env.NEXT_PUBLIC_KEY;
export const getTokenAcceptance = async () => {
	try {
		const response = await axios.get(`https://api-sandbox.co.uat.wompi.dev/v1/merchants/${pub_key}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
