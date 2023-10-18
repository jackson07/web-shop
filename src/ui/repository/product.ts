interface ProductRepositoryGetParams {
    page: number;
    limit: number;
}

interface RepositoryProduct {
    id: string;
    name: string;
    description: string;
    value: number;
    photo: string;
}

interface ProductRepositoryGetOutput {
    products: RepositoryProduct[];
    total: number;
    pages: number;
}

async function createProduct(formData: FormData) {
	const response = await fetch("../api/products", {
		method: "POST",
		body: formData,
	});
  
	if (response.ok) {
		const serverResponse = await response.json();
		return serverResponse;
	}
  
	throw new Error("Falha ao criar um novo produto :(");
}

async function get({page, limit,}: ProductRepositoryGetParams): Promise<ProductRepositoryGetOutput> {
	const response = await fetch(`/api/products?page=${page}&limit=${limit}`);
  
	if (!response.ok) {
		throw new Error(`Falha ao obter dados. Status: ${response.status}`);
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
