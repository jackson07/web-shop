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
		// console.log("srv response",serverResponse);
		// const ServerResponseSchema = schema.object({
		// 	id: schema.string(),
		// });
		// const serverResponseParsed = ServerResponseSchema.safeParse(serverResponse.data);
		// console.log("chegoooooooo", serverResponse.data);
		// if (!serverResponseParsed.success) {
		// 	throw new Error("Failed to create a new Product :(");
		// }

		return serverResponse;
	}
	throw new Error("Failed to create a new Product :(");
}

export const productsRepository = {
	createProduct,
};
