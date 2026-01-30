import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/products.service";

export const useGetProducts = (page: number, pageSize: number) => {
	return useQuery({
		queryKey: ["products", page, pageSize],
		queryFn: () => getProducts(page, pageSize),
		retry: 1,
		enabled: page > 0 && pageSize > 0,
		staleTime: 5 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};
