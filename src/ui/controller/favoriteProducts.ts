import { favoritePoductsRepository } from "../repository/favoriteProducts";

async function get() {
	return favoritePoductsRepository.get();
}

async function deleteFromBag(id:string) {
	await favoritePoductsRepository.deleteFromBag(id);    
}

export const favoritePoductsController = {
	get,	
	deleteFromBag
};
