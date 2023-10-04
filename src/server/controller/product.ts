import { productRepository } from "../repository/product";
import { ProductCreateSchema } from "../schema/product";
 
async function create(req: Request) {
	const data = await req.formData();
	console.log("fon",data);
	const body = ProductCreateSchema.safeParse(await req.json()); 
	console.log("fonzadas");
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
		const fileData = body.data.photo;
		const fileParsed: File = new File([], fileData.filename, { type: fileData.mimetype });
		const createProductId = await productRepository.createProduct(
			body.data.name,
			body.data.description, 
			body.data.value, 
			fileParsed
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
