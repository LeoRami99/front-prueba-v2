export type Product = {
	id: string;
	name: string;
	price: number;
	currency: "COP";
	description: string;
	image: string;
	category?: string;
	stock?: number;
};
