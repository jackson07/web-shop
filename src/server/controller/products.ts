import { productsRepository } from "../repository/products";
import { ProductSchema } from "../schema/product";

async function create(req: Request) {
	console.log("df");
	const body = ProductSchema.safeParse(await req.json()); 
	console.log("aaa");
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
		const createProduct = await productsRepository.createProduct(
			body.data.name,
			body.data.description, 
			body.data.value, 
			body.data.photo
		);
		return new Response(
			JSON.stringify({
				produts: createProduct
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
