import { favoritePoductsRepository } from "../repository/favoriteProducts";

async function get() {
	try {
		const products = await favoritePoductsRepository.get();	
		return new Response(
			JSON.stringify(
				products
			),
			{
				status: 201,
			}
		);
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
