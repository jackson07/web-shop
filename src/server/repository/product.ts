import { supabase } from "../infra/db/supabase";

async function createProduct(name:string, description: string, value: number, photo: string) {
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
	
	// const parsedData = ProductSchema.safeParse(data.id);

	return data.id;
}

export const productsRepository = {
	createProduct,
};
