interface RepositoryProducts {
    id: string;
    name: string;
    description: string;
    value: number;
    photo: string;
}

interface FavoriteProductsRepositoryGetOutPut{
    products: RepositoryProducts[];
}

async function get(): Promise<FavoriteProductsRepositoryGetOutPut> {
	const response = await fetch("/api/favoriteProducts");
	if(!response.ok) throw new Error("Falha ao obter produtos.");
	const responseData = await response.json();
	const parsedProducts = responseData.products as RepositoryProducts[];

	return {products: parsedProducts};
}

async function deleteFromBag(id:string) {
	const response = await fetch(`/api/favoriteProducts/${id}`, {
		method: "DELETE",
	});        

	if(!response.ok) throw new Error("Falha ao deletar!");
}

export const favoritePoductsRepository = {
	get,
	deleteFromBag
};
