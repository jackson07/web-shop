import { z as schema } from "zod";

export const FileSchema = schema.object({
	filename: schema.string(),
	mimetype: schema.string(),
	encoding: schema.string(),
});

export const ProductSchema = schema.object({
	name : schema.string().min(1),
	description : schema.string().min(1),
	value : schema.number().min(1),
	photo : FileSchema,
});


export type Product = schema.infer<typeof ProductSchema>;
