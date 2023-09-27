import { productsRepository } from "../repository/product";

interface ProductControllerGetParams {
    name: string,
    description : string,
    value : number,
    photo : string,
}

async function create({
	name, description, value, photo
}: ProductControllerGetParams) {
	productsRepository.createProduct(name, description, value, photo);  
}

export const productController = {
	create,
};
