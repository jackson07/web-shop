import { z as schema } from "zod";

export const ProductBagSchema = schema.object({
	id: schema.string().min(1)
});

export type ProductBag = schema.infer<typeof ProductBagSchema>;

export const TotalProductBagSchema = schema.object({
	totalBag: schema.string().min(1)
});

export type TotalProductBag = schema.infer<typeof TotalProductBagSchema>


