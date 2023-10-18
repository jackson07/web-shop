import { supabase } from "../infra/db/supabase";

type UUID = string;
async function insertOnBag(id:UUID) {
	const {error} = await supabase()
		.from("bag_list")
		.insert({id_products: id});
    
	if (error) throw new Error("Falha ao adicionar o produto na lista de favcoritos.");

	return "Produto adicionado à lista de favoritos com sucesso!";
}
async function get() {
	const {count, error} = await supabase()
		.from("bag_list")
		.select("*", {count: "exact"});    
	if(error)throw new Error("Falha ao obter dasdos");

	return count;
}


export const proudctBagRepository = {
	insertOnBag,
	get
};
