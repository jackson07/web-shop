import { supabase } from "../infra/db/supabase";

async function createProduct(name:string, description: string, value: number, photo: string) {
	
	console.log(name, "5");
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
	console.log(error);
	if (error) throw new Error("Failed to create product");
	
	console.log(data);
	return data;
}

export const productsRepository = {
	createProduct,
};
