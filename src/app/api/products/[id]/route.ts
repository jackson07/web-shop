import { productController } from "@/server/controller/product";

export async function DELETE(
	req:Request,
	{ params }: { params: { id: string } }
) {
	return await productController.deleteProduct(req,params.id);
}
