import { supabase } from "../infra/db/supabase";

async function get() {
	const {data, error} = await supabase()
		.from("Products")
		.select("*");

	if(error) throw new Error("Falha ao obter produtos");

	return data;
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
