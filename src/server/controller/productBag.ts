import { proudctBagRepository } from "../repository/productBag";
import { IDProductBagSchema } from "../schema/productBag";

async function insertOnBag(req:Request) {
	const body = IDProductBagSchema.safeParse(await req.json());
	
	if(!body.success) {
		return new Response(
			JSON.stringify({
				error: {
					message: "Erro ao adicionar, ID não reconhecido.",
					description: body.error.issues,
				},
			}),
			{
				status: 400,
			}
		);    
	}
	try {		
		const data = await proudctBagRepository.insertOnBag(body.data.id);
		return new Response(
			JSON.stringify({
				message: data
			}),
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
	// } catch {
	// 	return new Response(
	// 		JSON.stringify({
	// 			error: {
	// 				message: "Falha ao adicionar o produto, recarregue a página!",
	// 			},
	// 		}),
	// 		{
	// 			status: 400,
	// 		}
	// 	);   
	// }
}

async function get() {
	const totalBag = await proudctBagRepository.get();
	return new Response(
		JSON.stringify(
			totalBag
		)
	);
}

export const productBagController = {
	insertOnBag,
	get
};
