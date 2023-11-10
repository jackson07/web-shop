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
					message: "Necessário preencher enviar todos os dados para criar um produto.",
					description: data.error.issues,
				},
			}),
			{
				status: 400,
			}  
		);
	}

	const createProduct = await productRepository.createProduct(name, description, value, photo.name, photo);

	try {  
		return new Response(
			JSON.stringify({
				message: createProduct
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
					message: "`page` necessário ser um número",
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
					message: "`limit` necessário ser um número",
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
					message: "Falha ao obter produtos.",
				},
			}),
			{
				status: 400,
			}
		);
	}        
}

async function deleteProduct(req:Request, id: string) {
	try {
		await productRepository.deleteProducts(id);
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

export const productController = {
	create,
	get,
	deleteProduct
};
