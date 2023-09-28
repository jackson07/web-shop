import { productsRepository } from "../repository/product";

interface ProductControllerGetParams {
    name: string;
    description : string;
    value : number;
    photo : string;
    onSucess: (sucessMessage : string) => void;
    onError: (errorMessage: string) => void;
}

async function create({
	name, description, value, photo, onSucess, onError
}: ProductControllerGetParams) {
	productsRepository.createProduct(name, description, value, photo)
		.then(() => {
			onSucess("Cadastro realizado!");
		})  
		.catch(() => {
			onError("Deu errado! :(");
		});
}

export const productController = {
	create,
};
