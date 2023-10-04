import { supabase } from "../infra/db/supabase";
import { Product, ProductSchema } from "../schema/product";

interface ProductRepositoryGetParams {
    page?: number;
    limit?: number;
}

interface ProductRepositoryGetOutPut {
    products: Product[];
    total: number;
    pages: number;
}

async function createProduct(name:string, description: string, value: number, photo: File) {
	try {
		const { data, error } = await supabase()
			.from("Products")
			.insert([{
				name,
				description,
				value,
				photo
			},])
			.select()
			.single();
		if (error) throw new Error("Failed to create product");

		const storageResponse = await supabase()
			.storage
			.from("images")
			.upload(photo.name, photo);

		if (storageResponse.error) throw new Error("Failed to upload photo");

		return data.id;
	} catch (e) {
		const errorMessage = e instanceof Error ? e.message : "Unknown error";
		console.error("An error occurred:", errorMessage);
		throw new Error("Failed to create product"+errorMessage);
	}
}

async function get({
	page,
	limit,
}: ProductRepositoryGetParams = {}): Promise<ProductRepositoryGetOutPut> {
	const currentPage = page || 1;
	const currentLimit = limit || 10;
	const startIndex = (currentPage - 1) * currentLimit;
	const endIndex = currentPage * currentLimit - 1;
    
	const { data, error, count } = await supabase()
		.from("Products")
		.select("*", {
			count: "exact",
		})
		.range(startIndex,endIndex);

	if(error) throw new Error("Failed to fetch data.");

	const parsedData = ProductSchema.array().safeParse(data);

	if (!parsedData.success)
		throw new Error("Failed to parsed produts from database");

	const products = parsedData.data;
	const total = count || products.length;
	const totalPages = Math.ceil(total / currentLimit);
    
	return {
		total,
		products,
		pages: totalPages,
	};
    
}

export const productRepository = {
	createProduct,
	get,
};
