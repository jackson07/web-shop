import { productController } from "@/server/controller/products";

export async function POST(request: Request) {
	return await productController.create(request);    
}
