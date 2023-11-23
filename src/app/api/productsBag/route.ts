import { productBagController } from "@/server/controller/productBag";

export async function POST(request: Request) {
	const data = await productBagController.insertOnBag(request);
	return data;
}

export async function GET() {
	return await productBagController.get();    
}
