import { productBagController } from "@/ui/controller/productBag";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ProductContextType = {
    totalBag: number;
    idProducts: string[];
};
  
const ProductContext = createContext<ProductContextType>({
	totalBag: 0,
	idProducts: []
});

export function ProductProvider({ children }: { children: ReactNode }) {
	const [totalBag, setTotalBag] = useState(0);
	const [idProducts, setIdProducts] = useState(Array<string>);

	useEffect(() => {
		productBagController.get().then(({ total, id_products }) => {
			setTotalBag(total);
			setIdProducts(id_products);
		});
	}, []);
	return (
		<ProductContext.Provider value={{ totalBag, idProducts }}>
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
