import { z as schema } from "zod";

export const IDProductBagSchema = schema.object({
	id: schema.string().min(1)
});

export const ProductBagSchema = schema.object({
	id_products: schema.string().min(1)
});

export type ProductBag = schema.infer<typeof ProductBagSchema>;
