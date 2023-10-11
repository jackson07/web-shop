import { productBagController } from "@/server/controller/productBag";

export async function POST(request: Request) {
	//const test = await request.json();
	//console.log("foooooooon aqui",test);
	return await productBagController.insertOnBag(request);
}
