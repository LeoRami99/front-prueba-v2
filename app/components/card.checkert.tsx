import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { CreditCard } from "../../interfaces/credit-card.interface";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCreditCard } from "react-icons/fa";
import { getTokenCard } from "../../services/card.service";
import toast from "react-hot-toast";
import { useSteps } from "../../stores/useTransaction";
import { useCardToken } from "../../stores/useTransaction";

const CreditCardValidator = () => {
	const { setStep } = useSteps();
	const { setTokenCard } = useCardToken();
	const [cardType, setCardType] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreditCard>();

	const onSubmit: SubmitHandler<CreditCard> = (data) => {
		setLoading(true);
		// split the card number and remove spaces

		toast.promise(getTokenCard(data.number.split(" ").join(""), data.cvc, data.exp_month, data.exp_year, data.card_holder), {
			loading: "Validating card...",
			success: (res: any) => {
				setTokenCard(res.data.id);
				setStep(4);
				setLoading(false);
				return "Card validated successfully";
			},
			error: () => {
				setLoading(false);
				return "There was an error validating the card";
			},
		});
	};

	const formatCreditCardNumber = (value: string) => {
		const digits = value.replace(/\D/g, "");
		const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");

		// Identify card type
		if (digits) {
			if (digits.startsWith("4")) {
				setCardType("visa");
			} else if (/^5[1-5]/.test(digits)) {
				setCardType("mastercard");
			} else if (/^3[47]/.test(digits)) {
				setCardType("amex");
			} else if (/^6(?:011|5)/.test(digits)) {
				setCardType("discover");
			} else {
				setCardType(null);
			}
		} else {
			setCardType(null);
		}

		return formatted.slice(0, 19);
	};

	const getCardIcon = () => {
		switch (cardType) {
			case "visa":
				return <FaCcVisa className='text-2xl text-blue-700' />;
			case "mastercard":
				return <FaCcMastercard className='text-2xl text-orange-500' />;
			case "amex":
				return <FaCcAmex className='text-2xl text-blue-500' />;
			case "discover":
				return <FaCcDiscover className='text-2xl text-orange-600' />;
			default:
				return <FaCreditCard className='text-2xl text-gray-400' />;
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className='max-w-md mx-auto p-6'>
				<h2 className='text-2xl font-bold text-gray-800 text-center mb-6'>Add Card For Payment</h2>
				<div className='mb-4'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>Card Number</label>
					<div className='relative'>
						<input
							type='text'
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10'
							placeholder='1234 5678 9012 3456'
							{...register("number", {
								required: true,
								onChange: (e) => {
									e.target.value = formatCreditCardNumber(e.target.value);
								},
							})}
							disabled={loading}
							maxLength={19}
						/>
						<div className='absolute right-3 top-1/2 transform -translate-y-1/2'>{getCardIcon()}</div>
					</div>
					{errors.number && <span className='text-red-500 text-xs italic'>This field is required</span>}
				</div>

				<div className='flex gap-4 mb-4'>
					<div className='w-1/3'>
						<label className='block text-gray-700 text-sm font-bold mb-2'>CVC</label>
						<input
							type='text'
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='123'
							maxLength={4}
							disabled={loading}
							{...register("cvc", { required: true })}
						/>
						{errors.cvc && <span className='text-red-500 text-xs italic'>Required</span>}
					</div>

					<div className='w-1/3'>
						<label className='block text-gray-700 text-sm font-bold mb-2'>Exp Month</label>
						<input
							type='text'
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='MM'
							maxLength={2}
							disabled={loading}
							{...register("exp_month", { required: true })}
						/>
						{errors.exp_month && <span className='text-red-500 text-xs italic'>Required</span>}
					</div>

					<div className='w-1/3'>
						<label className='block text-gray-700 text-sm font-bold mb-2'>Exp Year</label>
						<input
							type='text'
							className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='YY'
							maxLength={2}
							disabled={loading}
							{...register("exp_year", { required: true })}
						/>
						{errors.exp_year && <span className='text-red-500 text-xs italic'>Required</span>}
					</div>
				</div>

				<div className='mb-6'>
					<label className='block text-gray-700 text-sm font-bold mb-2'>Card Holder</label>
					<input
						type='text'
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='Full Name on Card'
						disabled={loading}
						{...register("card_holder", { required: true })}
					/>
					{errors.card_holder && <span className='text-red-500 text-xs italic'>This field is required</span>}
				</div>

				<button type='submit' className='w-full btn btn-primary' disabled={loading}>
					{loading ? "Validating card..." : "Validate Card"}
				</button>
			</form>
		</div>
	);
};
export default CreditCardValidator;
