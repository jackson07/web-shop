import { ProductSchema } from "../schema/product";
import { z as schema } from "zod";

async function createProduct(
	name : string, 
	description : string, 
	value : number, 
	photo : string
) {
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
		const ServerResponseSchema = schema.object({
			product: ProductSchema,
		});
		console.log(serverResponse);
		const serverResponseParsed = ServerResponseSchema.safeParse(serverResponse);
		if (!serverResponseParsed.success) {
			throw new Error("Failed to create a new Product :(");
		}

		return serverResponseParsed;
	}
	console.log("aqui 32 repository/UI");
	throw new Error("Failed to create a new Product :(");
}

export const productsRepository = {
	createProduct,
};
