import { supabase } from "../infra/db/supabase";
import { ProductBag, ProductBagSchema } from "../schema/productBag";

type UUID = string;
interface BagProductRepositoryGetOutPut {
    id_products: ProductBag[];
    total: number;
}

async function insertOnBag(id:UUID) {
	const { data: existingData, error: errorToCheck } = await supabase()
		.from("bag_list")
		.select("id_products")
		.eq("id_products", id);

	if (errorToCheck) throw new Error("Falha ao adicionar o produto na lista de favcoritos.");
    
	if (existingData && existingData.length > 0) {
		throw new Error("Este produto já está na lista de favoritos.");
	}

	const {error} = await supabase()
		.from("bag_list")
		.insert({id_products: id});
    
	if (error) throw new Error("Falha ao adicionar o produto na lista de favcoritos.");

	return "Produto adicionado à lista de favoritos com sucesso!";
}

async function get():Promise<BagProductRepositoryGetOutPut> {
	const {count, data, error} = await supabase()
		.from("bag_list")
		.select("id_products", {count: "exact"});

	if(error)throw new Error("Falha ao obter dados.");
   
	const parsedData = ProductBagSchema.array().safeParse(data);
	if(!parsedData.success) throw new Error("Falha ao obter dados.");

	const id_products = parsedData.data;
	const total = count || id_products.length;
    
	return {
		id_products,
		total,
	};
}

export const proudctBagRepository = {
	insertOnBag,
	get,
};
