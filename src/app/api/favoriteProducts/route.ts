import { favoritePoductsController } from "@/server/controller/favoriteProducts";

export async function GET() {
	return await favoritePoductsController.get();
}
