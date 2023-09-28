import { ProductSchema } from "../schema/product";

async function createProduct(
	name : string, 
	description : string, 
	value : number, 
	photo : string
) {
	console.log("ds");
	const response = await fetch("../api/products", {
		method: "POST",
		headers: {
			//MIME Type
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, description, value, photo }),
	});

	if(response.ok){
		// return await response.json();
		const serverResponse = await response.json();

		const serverResponseParsed = ProductSchema.safeParse(serverResponse);
		if (!serverResponseParsed.success) {
			throw new Error("Failed to create a new Product :(");
		}

		return serverResponseParsed;
	}
}

export const productsRepository = {
	createProduct,
};
