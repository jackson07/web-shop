interface ProductRepositoryGetParams {
    page: number;
    limit: number;
}

interface RepositoryProduct {
    id: string;
    name: string;
    description: string;
    value: number;
    photo: File;
}

interface ProductRepositoryGetOutput {
    products: RepositoryProduct[];
    total: number;
    pages: number;
}

// async function createProduct(
// 	name : string, 
// 	description : string, 
// 	value : number, 
// 	photo : File
// ) {  
// 	const response = await fetch("../api/products", {
// 		method: "POST",
// 		headers: {
// 			//MIME Type
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({ name, description, value, photo }),
// 	});	
    
// 	if(response.ok){
// 		const serverResponse = await response.json();

// 		return serverResponse;
// 	}
// 	throw new Error("Failed to create a new Product :(");
// }

async function createProduct(formData: FormData) {
	const response = await fetch("../api/products", {
		method: "POST",
		body: formData,
	});
  
	if (response.ok) {
		const serverResponse = await response.json();
		return serverResponse;
	}
  
	throw new Error("Failed to create a new Product :(");
}

async function get({page, limit,}: ProductRepositoryGetParams): Promise<ProductRepositoryGetOutput> {
	const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
  
	if (!response.ok) {
		throw new Error(`Failed to fetch products. Status: ${response.status}`);
	}

	const responseData = await response.json();
	const products = responseData.products as RepositoryProduct[];
	return {
		total: responseData.total,
		pages: responseData.pages,
		products: products,
	};
}

export const productRepository = {
	createProduct,
	get,
};
