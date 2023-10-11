import { supabase } from "../infra/db/supabase";

type UUID = string;
async function insertOnBag(id:UUID) {
	const {error} = await supabase()
		.from("bag_list")
		.insert({id_products: id});
    
	console.log("fonnnn",error);
    
	if (error) throw new Error("Failed to add a product of favorite list");

	return "Produto adicionado à lista de favoritos com sucesso!";
}

export const proudctBagRepository = {
	insertOnBag
};
