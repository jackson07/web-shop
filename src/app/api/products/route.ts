import { productController } from "@/server/controller/products";

export async function POST(request: Request) {
	console.log("faz o post");
	return await productController.create(request);    
}
