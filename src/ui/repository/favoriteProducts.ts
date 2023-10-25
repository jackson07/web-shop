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

export const favoritePoductsRepository = {
	get,
};
