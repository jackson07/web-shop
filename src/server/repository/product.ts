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

async function createProduct(name:string, description: string, value: number, photo: string, file: File) {
	try {    
		const { data, error } = await supabase()
			.from("Products")
			.insert([
				{
					name,
					description,
					photo,
					value,
				},
			])
			.select("id")
			.single();
    
		if (error) throw new Error("Falha ao criar um novo produto.");
    
		await supabase()
			.storage.from("images")
			.upload(file.name, file);
    
		//if (storageResponse.error) throw new Error("Failed to upload photo"); //caso precise validar se a imagem existe. Nesse caso, se existir somente ignora
    
		return data.id;
	} catch (e) {
		const errorMessage = e instanceof Error ? e.message : "Unknown error";
		console.error("An error occurred:", errorMessage);
		throw new Error("Falha ao criar um novo produto " + errorMessage);
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
        
	if(error) throw new Error("Falha ao obter conteúdo.");
    
	const parsedData = ProductSchema.array().safeParse(data);
	if (!parsedData.success) throw new Error("Falha ao obter conteúdo da database.");
    
	const parsedDataWithPhotoLink = await Promise.all(parsedData.data.map(async (data) => {
		const publicUrl = await supabase().storage
			.from("images")
			.getPublicUrl(data.photo);
    
		return {
			...data,
			photo: publicUrl.data.publicUrl,
		};
	}));
    
	const products = parsedDataWithPhotoLink;      
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
