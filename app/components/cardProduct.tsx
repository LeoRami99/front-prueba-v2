import { FaCartShopping } from "react-icons/fa6";
import { Product } from "../types/product";
import { useTransactionParams } from "../stores/useTransaction";
import { useSteps } from "../stores/useSteps";

export const CardProduct = (props: Product) => {
	const { setProductId, setPrice } = useTransactionParams();
	const { setStep } = useSteps();
	const openModalTransaction = () => {
		setStep(1);
		setProductId(props.id);
		setPrice(props.price);
		const modal = document.getElementById("transaction-modal") as HTMLDialogElement;
		if (modal) {
			modal.showModal();
		}
	};
	return (
		<div className='card bg-base-100 w-full max-w-sm sm:max-w-md shadow-xl'>
			<figure>
				<img src={props.image} alt={props.description} />
			</figure>
			<div className='card-body'>
				<h2 className='card-title text-lg sm:text-xl'>{props.name}</h2>
				<p className='text-sm sm:text-base'>{props.description}</p>
				<span className='font-bold text-sm sm:text-base'>
					Precio: {props.currency.toUpperCase()} {props.price.toLocaleString()}
				</span>
				<div className='card-actions justify-end'>
					<button type='button' className='btn btn-primary btn-sm sm:btn-md' onClick={openModalTransaction}>
						<FaCartShopping className='mr-2' />
						Comprar
					</button>
				</div>
			</div>
		</div>
	);
};
