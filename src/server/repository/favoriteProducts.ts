import { supabase } from "../infra/db/supabase";

async function get() {
	const {data, error} = await supabase()
		.from("Products")
		.select("*");

	if(error) throw new Error("Falha ao obter produtos");

	return data;
}

export const favoritePoductstRepository = {
	get,
};
