import { productRepository } from "../repository/product";
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
		const createProductId = await productRepository.createProduct(
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

async function get(req: Request) {
	const { searchParams } = new URL(req.url);
	const query = {
		page: searchParams.get("page"),
		limit: searchParams.get("limit"),
	};
	const page = Number(query.page);
	const limit = Number(query.limit);

	if (query.page && isNaN(page)) {
		return new Response(
			JSON.stringify({
				error: {
					message: "`page` must be a number",
				},
			}),
			{
				status: 400,
			}
		);
	}
	
	if (query.limit && isNaN(limit)) {
		return new Response(
			JSON.stringify({
				error: {
					message: "`limit` must be a number",
				},
			}),
			{
				status: 400,
			}
		);
	}	
    
	try {
		const output = await productRepository.get({
			page,
			limit,
		});		

		return new Response(
			JSON.stringify({
				total: output.total,
				pages: output.pages,
				products: output.products,
			}),
			{
				status: 200,
			}
		);
	} catch {
		return new Response(
			JSON.stringify({
				error: {
					message: "Failed to fetch products",
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
	get,
};
