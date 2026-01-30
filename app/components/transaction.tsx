"use client";
import { FormFirstStep } from "../components/steps-transaction/form-firs-setp";
import CreditCardValidator from "./card.checkert";
import Modal from "./modal";
import { useSteps } from "../stores/useSteps";
import BuyStep from "./steps-transaction/buy.step";

export const Transaction = () => {
	const { step } = useSteps();

	return (
		<Modal id='transaction-modal'>
			{step === 1 && <FormFirstStep />}
			{step === 2 && <CreditCardValidator />}
			{step === 3 && <BuyStep />}
		</Modal>
	);
};

export default Transaction;
