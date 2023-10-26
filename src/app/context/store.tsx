"use client";
import { productBagController } from "@/ui/controller/productBag";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type IdProduct = {
    id_products: string;
};
  
type ProductContextType = {
    totalBag: number;
    idProducts: IdProduct[];
    updateProducts: () => void;
  };
  
const ProductContext = createContext<ProductContextType>({
	totalBag: 0,
	idProducts: [],
	updateProducts: () => {},
});

export function ProductProvider({ children }: { children: ReactNode }) {
	const [totalBag, setTotalBag] = useState(0);
	const [idProducts, setIdProducts] = useState<IdProduct[]>([]);

	const updateProducts = () => {
		productBagController.get().then(({ total, id_products }) => {
			setTotalBag(total);
			setIdProducts(id_products);
		});
	};
    
	useEffect(() => {
		updateProducts();
	}, []);
	return (
		<ProductContext.Provider value={{ totalBag, idProducts, updateProducts }}>
			{children}
		</ProductContext.Provider>
	);
}

export function useProductData() {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error("useProductData deve ser usado dentro de um ProducProvider");
	}
	return context;
}
