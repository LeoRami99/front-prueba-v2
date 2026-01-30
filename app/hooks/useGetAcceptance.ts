import { getTokenAcceptance } from "../services/acceptance-service";
import { useQuery } from "@tanstack/react-query";

export const useGetAcceptance = () => {
	return useQuery({
		queryKey: ["acceptance-token"],
		queryFn: () => getTokenAcceptance(),
	});
};
