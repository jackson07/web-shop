import { productsRepository } from "../repository/product";
import { z as schema } from "zod";

const ProductCreateSchema = schema.object({
	name : schema.string().min(1),
	description : schema.string().min(1),
	value : schema.number().min(1),
	photo : schema.string(),
});

async function create(req: Request) {
	const body = ProductCreateSchema.safeParse(await req.json()); 
	if(!body.success) {
		return new Response(
			JSON.stringify({
				error: {
					message: "You need to provide a data to create a product",
					description: body.error.issues,
				},
			}),
			{
				status: 400,
			}  
		);
	}
        
	try {        
		const createProductId = await productsRepository.createProduct(
			body.data.name,
			body.data.description, 
			body.data.value, 
			body.data.photo
		);
		return new Response(
			JSON.stringify({
				id: createProductId
			}),
			{
				status: 201,
			}
		);
	} catch {
		return new Response(
			JSON.stringify({
				error: {
					message: "Failed to create a product",
				},
			}),
			{
				status: 400,
			}
		);
	}
}

export const productController = {
	create,
};
