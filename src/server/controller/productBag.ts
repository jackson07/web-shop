import { proudctBagRepository } from "../repository/productBag";
import { ProductBagSchema } from "../schema/productBag";

async function insertOnBag(req:Request) {
	const body = ProductBagSchema.safeParse(await req.json());
	if(!body.success) {
		return new Response(
			JSON.stringify({
				error: {
					message: "Você precisa informar um ID.",
					description: body.error.issues,
				},
			}),
			{
				status: 400,
			}
		);    
	}
	try {
		const addId = await proudctBagRepository.insertOnBag(body.data.id_products);
		return new Response(
			JSON.stringify({
				message: addId
			}),
			{
				status: 201,
			}
		);
	} catch {
		return new Response(
			JSON.stringify({
				error: {
					message: "Falha ao adicionar o produto, recarregue a página!",
				},
			}),
			{
				status: 400,
			}
		);   
	}
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
