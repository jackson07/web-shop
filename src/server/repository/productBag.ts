import { supabase } from "../infra/db/supabase";

type UUID = string;
async function insertOnBag(id:UUID) {
	const {error} = await supabase()
		.from("bag_list")
		.insert({id_products: id});
    
	if (error) throw new Error("Failed to add a product of favorite list");

	return "Produto adicionado à lista de favoritos com sucesso!";
}
async function get() {
	const {count, error} = await supabase()
		.from("bag_list")
		.select("*", {count: "exact"});    
	if(error)throw new Error("Failed to fetch total bag values");

	return count;
}


export const proudctBagRepository = {
	insertOnBag,
	get
};
