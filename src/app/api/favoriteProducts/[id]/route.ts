import { favoritePoductsController } from "@/server/controller/favoriteProducts";

export async function DELETE(
	req:Request,
	{ params }: { params: { id: string } }
) {
	return await favoritePoductsController.deleteFromBag(req,params.id);
}
