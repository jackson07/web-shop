import { ProductBagSchema } from "../schema/productBag";
import { proudctBagRepository } from "../repository/productBag";

type UUID = string;
interface ProductInsertBagControllerParams {
    id: UUID;
    onSuccess: (message: string) => void;
    onError: (error: string) => void;
}
async function insertOnBag({
	id,
	onSuccess,
	onError,
}: ProductInsertBagControllerParams) {
	try {
		const objectId = {
			id: id
		};
		const parsedId = ProductBagSchema.safeParse(objectId);
		if(!parsedId.success){
			throw new Error("Erro ao adicionar, atualize a página!");
		}

		const tryAddBag = await proudctBagRepository.insertOnBag(parsedId.data.id);

		if (tryAddBag.error) {
			onError(tryAddBag.error.message);
		} else {
			onSuccess(tryAddBag.message);
		}

	} catch (error) {
		if(error instanceof Error){
			console.error("An unexpected error occurred:", error);   
		}
	}
}

async function get() {
	const totalBag = await proudctBagRepository.get();    
	return totalBag;
}

export const productBagController = {
	insertOnBag,
	get,
};
