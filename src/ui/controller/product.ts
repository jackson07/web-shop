import { productRepository } from "../repository/product";
import { ProductSchema, Product, FileSchema } from "../schema/product";
import { z as schema } from "zod";

interface ProductControllerGetParams {
    name: string;
    description : string;
    value : number;
    photo : File;
    onSuccess: (sucessMessage : string) => void;
    onError: (errorMessage: string) => void;
}

interface ProductsControllerGetParams {
    page: number;
}

async function create({
	name, description, value, photo, onSuccess, onError
}: ProductControllerGetParams) {
	let fields = "";
	try {
		const fileData = {
			filename: photo.name,
			mimetype: photo.type,
			encoding: "base64",
		};
        
		FileSchema.parse(fileData);
        
		const product: Product = {
			name,
			description,
			value,
			photo: fileData,
		};  
		//fail fast
		ProductSchema.parse(product);    
        
		await productRepository.createProduct(name, description, value, photo);        
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
			onError(`Deu errado! Verifique o campo: ${fields}`);
		} else {
			console.error("An unexpected error occurred:", error);
			onError("Deu errado! :(");
		}
	}
}

async function get({ page }: ProductsControllerGetParams) {
	return productRepository.get({ page: page || 1, limit: 8 });
}
    
export const productController = {
	create,
	get,
};
