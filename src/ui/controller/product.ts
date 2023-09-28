import { productsRepository } from "../repository/product";
import { ProductSchema, Product } from "../schema/product";
import { z as schema } from "zod";

interface ProductControllerGetParams {
    name: string;
    description : string;
    value : number;
    photo : string;
    onSuccess: (sucessMessage : string) => void;
    onError: (errorMessage: string) => void;
}

async function create({
	name, description, value, photo, onSuccess, onError
}: ProductControllerGetParams) {
	let fields = "";
	try {
		const product: Product = {
			name,
			description,
			value,
			photo
		};    

		ProductSchema.parse(product);    
		await productsRepository.createProduct(name, description, value, photo);

		onSuccess("Cadastro realizado com sucesso!");
	} catch (error) {
		if (error instanceof schema.ZodError) {
			const fieldErrors = error.errors.map(err => ({
				path: err.path,
				message: err.message
			}));
			console.error("Validation errors:", fieldErrors);
			fieldErrors.forEach(({ path }) => {
				fields += String(path)+" ";
			});
			onError(`Deu errado! Algum campo não está correto. Campo: ${fields}`);
		} else {
			console.error("An unexpected error occurred:", error);
			onError("Deu errado! :(");
		}
	}
}
    
export const productController = {
	create,
};
