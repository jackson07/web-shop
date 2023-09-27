import { productsRepository } from "../repository/products";

async function create(req: Request) {
	const body = await req.json();   
	console.log("paso aqui",req);
	console.log(body.name, "foooooon");
	try {        
		const createProduct = await productsRepository.createProduct(
			body.name,
			body.description, 
			body.value, 
			body.photo
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
					message: "Failed to create todo",
				},
			}),
			{
				status: 400,
			}
		);
	}
	// return new Response(
	// 	JSON.stringify({
	// 		product: {
	// 			name: "dfsdf",
	// 			description: "dfsdf",
	// 			value: 123123,
	// 			photo: "dssd",
	// 		},
	// 	})
	// );
}

export const productController = {
	create,
};
