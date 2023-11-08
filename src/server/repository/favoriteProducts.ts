import { supabase } from "../infra/db/supabase";
import { Product, ProductSchema } from "../schema/product";

interface FavoriteRepositoryGetOutPut {
    products: Product[];
}

async function get(): Promise<FavoriteRepositoryGetOutPut> {    
	const { data, error } = await supabase()
		.from("Products")
		.select("*")
		.range(0,61);

	if(error) throw new Error("Falha ao obter produtos");
    
	const parsedData = ProductSchema.array().safeParse(data);
    
	if(!parsedData.success) throw new Error("Falha ao obter dados.");
	console.log("",parsedData.data,parsedData.data.length);

	return {products: parsedData.data};
}

async function deleteFromBag(id:string) {
	const {error} = await supabase()
		.from("bag_list")
		.delete()
		.eq("id_products", id);

	if (error) throw new Error(`Produto com ID: "${id}" não encontrado.`);     
}

export const favoritePoductsRepository = {
	get,
	deleteFromBag
};

