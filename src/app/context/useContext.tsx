import { productBagController } from "@/ui/controller/productBag";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ProductContextType = {
    totalBag: number;
    idProducts: string[];
};
  
const ProductContext = createContext<ProductContextType>({
	totalBag: 0,
	idProducts: [],
});

export function ProductProvider({ children }: { children: ReactNode }) {
	const [totalBag, setTotalBag] = useState(0);
	const [idProducts, setIdProducts] = useState<Array<string>>([]); //useState(Array<string>);

//     Como fazer um looping para buscar os IDs do seguinte json:

// id_products": [
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "906e0718-d954-48ce-bd96-b2ade9f5f112"
//     },
//     {
//       "id_products": "906e0718-d954-48ce-bd96-b2ade9f5f112"
//     },
//     {
//       "id_products": "52b50c46-4d77-4b6a-b7e9-aa7169392408"
//     },
//     {
//       "id_products": "0da3a12e-a7ab-4bd9-a0e6-d4d3a771bdeb"
//     },
//     {
//       "id_products": "52b50c46-4d77-4b6a-b7e9-aa7169392408"
//     },
//     {
//       "id_products": "906e0718-d954-48ce-bd96-b2ade9f5f112"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "906e0718-d954-48ce-bd96-b2ade9f5f112"
//     },
//     {
//       "id_products": "906e0718-d954-48ce-bd96-b2ade9f5f112"
//     },
//     {
//       "id_products": "906e0718-d954-48ce-bd96-b2ade9f5f112"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     },
//     {
//       "id_products": "9574cda6-9345-4d5f-9858-eaae34546bb9"
//     }
//   ],

// preciso fazer com typescript, retornando um Array<string>
    
	useEffect(() => {
		productBagController.get().then(({ total, id_products }) => {		
			const total = data.total;
			const idProducts = id_products.map(item => item.);
			setTotalBag(total);
			setIdProducts(idProducts);
			console.log("context", idProducts, data.id_products, total);
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
