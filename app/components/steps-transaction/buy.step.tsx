"use client";
import { useTransactionParams } from "@/app/stores/useTransaction";
import { ITransaction } from "@/app/types/transaction";
import { useForm } from "react-hook-form";
import { TAX } from "@/app/const/const";
import { useCreateTransaction } from "@/app/hooks/useTransaction";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const BuyStep = () => {
	const router = useRouter();
	const { acceptance_token, amount, installments, price, productId, token_card, userId, methodPayment } = useTransactionParams();
	const { mutateAsync: createTransaction, isPending, isSuccess } = useCreateTransaction();
	const { handleSubmit } = useForm<ITransaction>({
		defaultValues: {
			acceptance_token,
			amount: parseInt(amount.toString()),
			installments,
			price,
			productId,
			token_card,
			userId,
			methodPayment,
		},
	});

	const onBuy = (data: ITransaction) => {
		toast.promise(
			createTransaction({
				...data,
				amount: parseInt(data.amount.toString()),
			}),
			{
				loading: "Procesando compra...",
				success: (response) => {
					// sera redigirido a la pagina de transaccion exitosa
					toast.success("Redirigiendo a la página de éxito...");
					router.push(`/transaction/${response.referenceInternalTransaction}`);
					return `Compra realizada con éxito. Transaction ID: ${response.referenceInternalTransaction}`;
				},
				error: "Error al procesar la compra.",
			},
		);
	};

	return (
		<form onSubmit={handleSubmit(onBuy)} className='p-4'>
			<div className='mb-4 border-y border-gray-200 py-3'>
				<p className='my-1.5'>
					<strong>Acceptance:</strong> {acceptance_token ? "Si" : "No"}
				</p>
				<p className='my-1.5'>
					<strong>Credit Card:</strong> {token_card ? "Si" : "No"}
				</p>
				<p className='my-1.5'>
					<strong>Method Payment:</strong> {methodPayment}
				</p>
			</div>

			<table className='mb-4 w-full border-collapse'>
				<thead>
					<tr>
						<th className='border-b border-gray-200 py-2 text-left'>Detalle</th>
						<th className='border-b border-gray-200 py-2 text-right'>Cantidad</th>
						<th className='border-b border-gray-200 py-2 text-right'>Precio</th>
						<th className='border-b border-gray-200 py-2 text-right'>Total</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className='py-2'>Producto {productId}</td>
						<td className='text-right'>{amount}</td>
						<td className='text-right'>{price}</td>
						<td className='text-right'>{price * amount}</td>
					</tr>
				</tbody>
			</table>

			<div className='mb-2 flex justify-between'>
				<span>Subtotal</span>
				<strong>{price * amount}</strong>
			</div>
			<div className='mb-2 flex justify-between'>
				<span>Impuesto ({TAX * 100}%)</span>
				<strong>{price * amount * TAX}</strong>
			</div>
			<div className='flex justify-between text-lg'>
				<span>Total</span>
				<strong>{price * amount * (1 + TAX)}</strong>
			</div>
			<button type='submit' className='btn btn-primary rounded-full w-full mt-6' disabled={isPending || isSuccess}>
				{isPending ?
					"Procesando..."
				: isSuccess ?
					"Compra Exitosa"
				:	"Comprar Ahora"}
			</button>
		</form>
	);
};

export default BuyStep;
