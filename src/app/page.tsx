"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./components/product/productCard";
import Header from "./components/header/header";
import { productController } from "@/ui/controller/product";

interface HomeProduct {
    id: string;
    name: string;
    description: string;
    value: number;
    photo: string;
}

export default function Home() {
	const initialLoadComplete = useRef(false);
	const [products,setProducts] = useState<HomeProduct[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {		
		if (!initialLoadComplete.current) {
			productController
				.get({ page })
				.then(({products, pages}) => {
					setProducts(products);
					setTotalPages(pages);
				})
				.finally(() => {
					initialLoadComplete.current = true;
				});
		}
	}, [page]);

	console.log(totalPages, products);
    
	function handleClick(){
		setPage(1);
	}

	return (
		<div>			
			<Header/>
			<main className="min-h-screen">
				<div className="grid grid-cols-4 gap-3 p-20">
					{products.map((product) => {
						return (
							<ProductCard 
								key={product.id}
								title={product.name} 
								description={product.description}
								price={product.value}/>  
						);
					})}					
				</div>				
				<button onClick={handleClick}>{page}</button>
			</main>
			<footer className="h-6 w-full bg-gray-400">
				<div className="flex items-center justify-center">@ create by Jack</div>
			</footer>
		</div>	
	);
}
