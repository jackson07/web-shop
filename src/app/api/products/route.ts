import { productController } from "@/server/controller/product";

export async function GET(request:Request) {
	
	return await productController.get(request);    
}

export async function POST(request: Request) {
	return await productController.create(request);    
}
