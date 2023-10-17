import { ProductBagSchema } from "../schema/productBag";
import { proudctBagRepository } from "../repository/productBag";
//import { v4 as uuidv4 } from "uuid";

type UUID = string;

async function insertOnBag(id:UUID) {
	try {
		const objectId = {
			id: id
		};
		const parsedId = ProductBagSchema.safeParse(objectId);
		if(!parsedId.success){
			throw new Error("Erro ao adicionar, atualize a página!");
		}
		const tryAddBag = await proudctBagRepository.insertOnBag(parsedId.data.id);
		return tryAddBag;
	} catch (error) {
		if(error instanceof Error){
			console.error("An unexpected error occurred:", error);   
		}
	}
}

async function get() {
	return proudctBagRepository.get();    
}


export const productBagController = {
	insertOnBag,
	get
};
