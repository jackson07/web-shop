import { favoritePoductsController } from "@/server/controller/favoriteProducts";

export async function POST() {
	return;
}

export async function GET() {
	return await favoritePoductsController.get();
}
