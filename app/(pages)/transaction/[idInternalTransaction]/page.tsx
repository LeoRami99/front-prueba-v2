"use client";
import { useParams } from "next/navigation";
import { useGetInfoTransaction } from "@/app/hooks/useGetInfoTransaction";
import { TAX } from "@/app/const/const";

const TransactionPage = () => {
	const { idInternalTransaction } = useParams();
	const { data, isLoading, isError } = useGetInfoTransaction(String(idInternalTransaction ?? ""));

	const price = data?.price ?? 0;
	const taxAmount = price * TAX;
	const totalWithTax = price + taxAmount;

	if (!idInternalTransaction) {
		return (
			<div className='flex h-dvh items-center justify-center bg-gray-50 px-4'>
				<div className='w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
					<h1 className='text-lg font-semibold text-gray-900'>ID de transacción no proporcionado</h1>
					<p className='mt-2 text-sm text-gray-500'>Verifica el enlace o intenta nuevamente.</p>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className='flex h-dvh items-center justify-center bg-gray-50 px-4'>
				<div className='w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
					<div className='flex items-center gap-3'>
						<div className='h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-gray-600' />
						<div>
							<p className='text-sm text-gray-500'>Cargando transacción</p>
							<p className='text-base font-semibold text-gray-900'>Por favor espera…</p>
						</div>
					</div>
					<div className='mt-6 space-y-3'>
						<div className='h-4 w-3/4 animate-pulse rounded bg-gray-100' />
						<div className='h-4 w-2/3 animate-pulse rounded bg-gray-100' />
						<div className='h-4 w-1/2 animate-pulse rounded bg-gray-100' />
					</div>
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className='flex h-dvh items-center justify-center bg-gray-50 px-4'>
				<div className='w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-sm'>
					<div className='flex items-start gap-3'>
						<div className='rounded-full bg-red-100 px-3 py-2 text-sm font-semibold text-red-700'>!</div>
						<div>
							<h1 className='text-lg font-semibold text-gray-900'>Error al cargar la transacción</h1>
							<p className='mt-1 text-sm text-gray-500'>Intenta recargar la página o verifica tu conexión.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='w-full flex justify-center items-center h-dvh'>
			<div className='max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
				<div className='flex items-center justify-between border-b pb-4'>
					<div>
						<h1 className='text-xl font-semibold text-gray-900'>Factura</h1>
						<p className='text-sm text-gray-500'>ID: {idInternalTransaction}</p>
					</div>
					<span className='rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700'>{data?.status ?? "Sin estado"}</span>
				</div>

				<div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
					<div>
						<p className='text-xs uppercase text-gray-500'>Referencia</p>
						<p className='text-sm font-medium text-gray-900'>{data?.referenceInternalTransaction}</p>
					</div>
					<div>
						<p className='text-xs uppercase text-gray-500'>Método de pago</p>
						<p className='text-sm font-medium text-gray-900'>{data?.methodPayment}</p>
					</div>
					<div>
						<p className='text-xs uppercase text-gray-500'>ID externo</p>
						<p className='text-sm font-medium text-gray-900'>{data?.idExternalTransaction}</p>
					</div>
					<div>
						<p className='text-xs uppercase text-gray-500'>Usuario</p>
						<p className='text-sm font-medium text-gray-900'>{data?.userId}</p>
					</div>
				</div>

				<div className='mt-6 rounded-md bg-gray-50 p-4'>
					<div className='flex items-center justify-between'>
						<p className='text-sm text-gray-600'>Producto</p>
						<p className='text-sm font-medium text-gray-900'>{data?.productId}</p>
					</div>
					<div className='mt-2 flex items-center justify-between'>
						<p className='text-sm text-gray-600'>Cantidad</p>
						<p className='text-sm font-medium text-gray-900'>{data?.amount}</p>
					</div>
					<div className='mt-2 flex items-center justify-between'>
						<p className='text-sm text-gray-600'>Precio</p>
						<p className='text-sm font-medium text-gray-900'>{price.toLocaleString("es-CO", { style: "currency", currency: "COP" })}</p>
					</div>
					<div className='mt-2 flex items-center justify-between'>
						<p className='text-sm text-gray-600'>Impuesto ({(TAX * 100).toFixed(0)}%)</p>
						<p className='text-sm font-medium text-gray-900'>
							{taxAmount.toLocaleString("es-CO", { style: "currency", currency: "COP" })}
						</p>
					</div>
					<div className='mt-4 flex items-center justify-between border-t pt-3'>
						<p className='text-sm font-semibold text-gray-900'>Total</p>
						<p className='text-base font-semibold text-gray-900'>
							{totalWithTax.toLocaleString("es-CO", { style: "currency", currency: "COP" })}
						</p>
					</div>
				</div>

				<div className='mt-4 text-xs text-gray-500'>
					<p>Creado: {data?.createdAt ? new Date(data.createdAt).toLocaleString("es-CO") : "N/A"}</p>
					<p>Actualizado: {data?.updatedAt ? new Date(data.updatedAt).toLocaleString("es-CO") : "N/A"}</p>
				</div>
			</div>
		</div>
	);
};

export default TransactionPage;
