import { z as schema } from "zod";

export const ProductBagSchema = schema.object({
	id: schema.string().min(1)
});

export type ProductBag = schema.infer<typeof ProductBagSchema>;
