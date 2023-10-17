import { proudctBagRepository } from "../repository/productBag";
import { ProductBagSchema } from "../schema/productBag";

async function insertOnBag(req:Request) {
	console.log(req);
	const body = ProductBagSchema.safeParse(await req.json());
	if(!body.success) {
		return new Response(
			JSON.stringify({
				error: {
					message: "You need to provide a ID to add to favorite list",
					description: body.error.issues,
				},
			}),
			{
				status: 400,
			}
		);    
	}
	try {
		const addId = await proudctBagRepository.insertOnBag(body.data.id);
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
					message: "Failed to add to favorite list, reload the page",
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
		JSON.stringify({
			totalBag: totalBag
		})
	);
}

export const productBagController = {
	insertOnBag,
	get
};
