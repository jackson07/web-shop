import { favoritePoductsRepository } from "../repository/favoriteProducts";

async function get() {
	const products = await favoritePoductsRepository.get();	
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

async function deleteFromBag(req:Request, id: string) {
	try {
		await favoritePoductsRepository.deleteFromBag(id);
		return new Response(null, {
			status: 204,
		});
	} catch (err) {
		if (err instanceof Error) {
			return new Response(
				JSON.stringify({
					error: {                        
						message: err.message,
					},
				}),
				{
					status: 404,
				}
			);
		}
	}
    
}

export const favoritePoductsController = {
	get,
	deleteFromBag
};
