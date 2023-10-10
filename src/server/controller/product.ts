import { productRepository } from "../repository/product";
import { ProductCreateSchema } from "../schema/product";
 
async function create(req: Request) {
	const formData = await req.formData();
	const name = formData.get("product") as string;
	const description = formData.get("description") as string;
	const value = Number(formData.get("value"));
	const photo = formData.get("photo") as File;

	const productData = {
		name,
		description,
		value,
		photo: {
			filename: photo.name,
			mimetype: photo.type,
			encoding: "base64", // You can modify this based on your needs
		},
	};

	// Validate using Zod Schema
	const data = ProductCreateSchema.safeParse(productData);
	if(!data.success) {
		return new Response(
			JSON.stringify({
				error: {
					message: "You need to provide a full data to create a product",
					description: data.error.issues,
				},
			}),
			{
				status: 400,
			}  
		);
	}

	const createProductId = await productRepository.createProduct(name, description, value, photo.name, photo);

	try {  
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
