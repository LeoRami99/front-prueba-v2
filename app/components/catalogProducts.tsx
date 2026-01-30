"use client";
import { useGetProducts } from "../hooks/useProducts";
import { useState } from "react";
import { Product } from "../types/product";
import { CardProduct } from "./cardProduct";

const CatalogProducts = () => {
	const [page, setPage] = useState(1);
	const [pageSize] = useState(10);
	const { data, isLoading, isError } = useGetProducts(page, pageSize);
	const offset = (page - 1) * pageSize;
	const limit = offset + pageSize;

	return (
		<div>
			<h1 className='text-2xl font-bold mb-4'>Product Catalog</h1>
			{isLoading && (
				<div className='w-full h-dvh flex justify-center items-center'>
					<div className='flex justify-center items-center flex-col gap-4'>
						<span className='loading loading-spinner loading-xl'></span>
						<h2>Cargando productos...</h2>
					</div>
				</div>
			)}

			{isError && <p className='text-red-600'>Error loading products.</p>}

			{data && data.products.length === 0 && !isLoading && <p>No products available.</p>}

			{data && data.products.length > 0 && (
				<>
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
						{data.products.map((product: Product) => (
							<CardProduct {...product} key={product.id} />
						))}
					</div>

					<div className='flex items-center justify-center mt-6 gap-4'>
						<button
							type='button'
							className='btn btn-primary'
							onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
							disabled={page === 1}
							aria-label='Previous page'>
							Anterior
						</button>

						<span className='text-sm text-gray-600'>
							Página {page} of {Math.max(1, Math.ceil(data.total / pageSize))}
						</span>

						<button
							type='button'
							className='btn btn-primary'
							onClick={() => setPage((prev) => prev + 1)}
							disabled={limit >= data.total}
							aria-label='Next page'>
							Siguiene
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default CatalogProducts;
