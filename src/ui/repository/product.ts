// interface Product {
//     name: string,
//     description : string,
//     value : string,
//     photo : string,
// }

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
		return await response.json();
	}
}

export const productsRepository = {
	createProduct,
};
