import { Product } from "../types/product";

export const CardProduct = (props: Product) => {
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
					<button type='button' className='btn btn-primary btn-sm sm:btn-md'>
						Comprar
					</button>
				</div>
			</div>
		</div>
	);
};
