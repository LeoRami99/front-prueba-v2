"use client";
import { useForm } from "react-hook-form";
import { useTransactionParams } from "../../stores/useTransaction";
import { useGetAcceptance } from "../../hooks/useGetAcceptance";
import { useSteps } from "@/app/stores/useSteps";

export const FormFirstStep = () => {
	const { setAmount, setAcceptanceToken } = useTransactionParams();
	const { data, isLoading, isError, isSuccess } = useGetAcceptance();
	const { setStep } = useSteps();

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<{
		amount: number;
		acceptance_token: string;
	}>();

	const onSubmiteNextStep = () => {
		setAmount(getValues("amount"));
		setStep(2);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmiteNextStep)} className='flex flex-col gap-4 p-6'>
				<div className='flex flex-col gap-2'>
					<label htmlFor='amount' className='text-sm font-medium text-gray-700'>
						Amount
					</label>
					<input
						type='number'
						id='amount'
						className='w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
						placeholder='Enter amount'
						{...register("amount", { required: "Amount is required" })}
					/>
					{errors.amount && <span className='text-xs text-red-600'>{errors.amount.message}</span>}
				</div>
				<div className='flex flex-col gap-2'>
					<label htmlFor='acceptance_token' className='text-sm font-medium text-gray-700'>
						Acceptance Token
					</label>
					{isLoading && <span className='text-xs text-gray-500'>Loading terms...</span>}
					{isError && <span className='text-xs text-red-600'>Failed to load terms. Please try again.</span>}
					{isSuccess && (
						<>
							<a href={data.data.permalink} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline text-sm mb-1'>
								Click here to review terms and conditions
							</a>
							<label className='flex items-center gap-2 text-sm text-gray-700'>
								<input
									type='checkbox'
									id='acceptance_token'
									className='h-4 w-4 rounded border border-gray-300 focus:ring-2 focus:ring-blue-200'
									disabled={isLoading || isError}
									{...register("acceptance_token", {
										required: "Acceptance token is required",
										onChange: (e) => {
											const token = data.data.presigned_acceptance.acceptance_token;
											setAcceptanceToken(e.target.checked ? token : "");
										},
									})}
								/>
								I accept the terms and conditions
							</label>
							{errors.acceptance_token && <span className='text-xs text-red-600'>{errors.acceptance_token.message}</span>}
						</>
					)}
				</div>
				<button type='submit' className='btn btn-primary rounded-full w-full'>
					Continue
				</button>
			</form>
		</div>
	);
};
