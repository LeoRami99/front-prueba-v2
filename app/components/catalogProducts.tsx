"use client";
import { useGetProducts } from "../hooks/useProducts";
import { useState } from "react";
import { Product } from "../types/product";
import { CardProduct } from "./cardProduct";

const CatalogProducts = () => {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const { data, isLoading, isError } = useGetProducts(1, 10);

	return (
		<div>
			{isLoading && <p>Loading products...</p>}
			{isError && <p>Error loading products.</p>}
			{data && (
				<div>
					<h1 className='text-2xl font-bold mb-4'>Product Catalog</h1>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{data.products.map((product: Product) => (
							<CardProduct {...product} key={product.id} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CatalogProducts;
