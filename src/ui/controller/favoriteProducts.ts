import { favoritePoductsRepository } from "../repository/favoriteProducts";

async function get() {
	return favoritePoductsRepository.get();
}

export const favoritePoductsController = {
	get,
};
