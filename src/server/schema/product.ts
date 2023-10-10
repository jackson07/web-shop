import { z as schema } from "zod";

export const FileSchema = schema.object({
	filename: schema.string(),
	mimetype: schema.string(),
	encoding: schema.string(),
});

export type FileType = schema.infer<typeof FileSchema>;

export const ProductSchema = schema.object({
	id: schema.string().uuid(),
	name : schema.string().min(1),
	description : schema.string().min(1),
	value : schema.number().min(1),
	photo : schema.string().min(1),
});

export type Product = schema.infer<typeof ProductSchema>;

export const ProductCreateSchema = schema.object({
	name : schema.string().min(1),
	description : schema.string().min(1),
	value : schema.number().min(1),
	photo : FileSchema,
});

export type ProductCreate = schema.infer<typeof ProductCreateSchema>;

