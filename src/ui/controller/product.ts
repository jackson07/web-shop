import { productRepository } from "../repository/product";
import { ProductSchema, Product, FileSchema } from "../schema/product";

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
	try {
		if (!(photo instanceof File)) {
			throw new Error("Necessário escolher uma imagem!.");
		}
        
		const fileData = {
			filename: photo.name || "",
			mimetype: photo.type || "",
			encoding: "base64",
		};
        
		FileSchema.safeParse(fileData);
        
		const product: Product = {
			name,
			description,
			value,
			photo: fileData,
		};  
        
		//fail fast
		const parsedProds = ProductSchema.safeParse(product);            
		if (!parsedProds.success) {
			throw new Error("Preencha todos os campos!");
		}

		const formData = new FormData();
		formData.append("product", name);
		formData.append("description", description);
		formData.append("value", String(value));
		formData.append("photo", photo as File);

		await productRepository.createProduct(formData);        
		onSuccess("Cadastro realizado com sucesso!");        
	} catch (error) {
		if(error instanceof Error){
			console.error("An unexpected error occurred:", error);
			onError("Erro ao inserir produto! "+error.message);    
		}
	}
}

async function get({ page }: ProductsControllerGetParams) {
	return productRepository.get({ page: page || 1, limit: 4 });
}
    
export const productController = {
	create,
	get,
};
