import CatalogProducts from "./components/catalogProducts";
import Navbar from "./components/navbar";
import Transaction from "./components/transaction";

export default function Home() {
	return (
		<>
			<Navbar />
			<div className='flex min-h-screen items-center justify-center'>
				<main className='flex min-h-screen w-full max-w-7xl p-4 justify-center items-center'>
					<CatalogProducts />
				</main>
			</div>
			<Transaction />
		</>
	);
}
