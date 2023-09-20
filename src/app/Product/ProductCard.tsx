import React from "react";
import { BiBookmarkHeart, BiCartAdd } from "react-icons/bi";
import formatCurrency from "../utils/formatCurrency";

interface ProductCardProps {
    title: string,
    description: string,
    price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, price }) => {
	return (
		<div className="bg-blue-200 pt-4 px-4 h-96 flex flex-col justify-between items-center hover:border-4 border-gray-500 rounded-md">
			<h2 className="text-2xl text-red-500 font-semibold">{title}</h2>
			<div className="flex items-center w-40 h-40">
				<img
					src="https://cdn-icons-png.flaticon.com/512/2331/2331716.png"
					alt="Minha Figura"
					className="max-h-full max-w-full"
				/>
			</div>
			<div className="text-sm text-center">
				{description}
			</div>
			<div className="text-2xl">{formatCurrency(price,"BRL")}</div>
			<div className="h-6 flex items-center justify-center space-x-6 w-full">
				<button className="flex items-center"><BiCartAdd/>Comprar</button>
				<button className="group relative">
					<BiBookmarkHeart/>
					<div className="hidden group-hover:block bg-black text-white text-xs absolute bottom-full transform -translate-x-1/2 p-1 rounded w-24">
                        Lista de Desejos
					</div>
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
