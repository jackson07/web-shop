import { z as schema } from "zod";

export const ProductSchema = schema.object({
	id: schema.string().uuid(),
	name : schema.string().min(1),
	description : schema.string().min(1),
	value : schema.number().min(1),
	photo : schema.string(),
});

export type Product = schema.infer<typeof ProductSchema>;
