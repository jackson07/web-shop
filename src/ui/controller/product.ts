import { productRepository } from "../repository/product";
import { ProductSchema, Product, FileSchema } from "../schema/product";

interface ProductControllerGetParams {
    name: string;
    description : string;
    value : number;
    photo : File;
    onSuccess: (message: string) => void;
    onError: (errore: string) => void;
}

interface ProductsControllerGetParams {
    page: number;
    limit?: number
}

async function create({
	name, description, value, photo, onSuccess, onError
}: ProductControllerGetParams) {
	try {	
		if (!(photo instanceof File)) {
			throw new Error("necessário escolher uma imagem!");
		}
		const fileData = {
			filename: photo.name || "x",
			mimetype: photo.type || "x",
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
			throw new Error("preencha todos os campos!");
		}

		const formData = new FormData();
		formData.append("product", name);
		formData.append("description", description);
		formData.append("value", String(value));
		formData.append("photo", photo as File);

		const data = await productRepository.createProduct(formData); 
        
		if (data.error) {
			onError(data.error.message);
		} else {
			onSuccess(data.message);
		}
		return;
	} catch (error) {
		if(error instanceof Error){
			console.error("An unexpected error occurred:", error);
			onError("Erro ao inserir produto, "+error.message);    
		}
	}
}

async function get({ page, limit }: ProductsControllerGetParams) {
	return productRepository.get({ page: page || 1, limit: limit || 8 });
}

async function deleteProduct(id:string) {
	await productRepository.deleteProduct(id);    
}
    
export const productController = {
	create,
	get,
	deleteProduct
};
