import { favoritePoductstRepository } from "../repository/favoriteProducts";

async function get() {
	const products = await favoritePoductstRepository.get();
	try {
		return new Response(
			JSON.stringify({products}),{
				status: 200,
			}
		);
	} catch {
		return new Response(
			JSON.stringify({
				error: {
					message: "Falha ao obter produtos.",
				},
			}),
			{
				status: 400,
			}
		);
	}

}

export const favoritePoductsController = {
	get,
};
