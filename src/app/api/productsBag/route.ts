import { productBagController } from "@/server/controller/productBag";

export async function POST(request: Request) {
	return await productBagController.insertOnBag(request);
}

export async function GET() {
	return await productBagController.get();    
}
