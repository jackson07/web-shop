"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./components/product/productCard";
import Header from "./components/header/header";
import { productController } from "@/ui/controller/product";
import { ProductProvider } from "./context/useContext";

interface HomeProduct {
    id: string;
    name: string;
    description: string;
    value: number;
    photo: string;
}

export default function Home() {
	const initialLoadComplete = useRef(false);
	const [products, setProducts] = useState<HomeProduct[]>([]);
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
 
	useEffect(() => {		
		if (!initialLoadComplete.current) {
			productController
				.get({ page })
				.then(({products, pages}) => {
					setProducts(products);
					setTotalPages(pages);
				})
				.finally(() => {
					setPage(1);
					setIsLoading(false);
					initialLoadComplete.current = true;
				});
		}
	}, [page]);

	return (
		<>			
			<ProductProvider>
				<Header/>
			</ProductProvider>
			<main className="min-h-screen flex flex-col items-center justify-center pb-6">
				{isLoading && (
					<div className="p-20">
						<h2>Carregando...</h2>
					</div>
				)}
				<div className="grid grid-cols-4 gap-3 p-20">
					{products.map((product) => {
						return (
							<ProductCard 
								key={product.id}
								title={product.name} 
								description={product.description}
								price={product.value}    
								photo={product.photo}
								id={product.id}
							/>                              
						);
					})}					
				</div>				
				<div className="flex items-center justify-center pt-40 space-x-3">
					{(page <= totalPages) && !(page <= 1) && <button
						onClick={() => {
							const nextPage = page - 1;
							setPage(nextPage);
							productController
								.get({ page: nextPage })
								.then(({ products, pages }) => {
									setProducts(() => {
										return [
											...products,
										];
									});
									setTotalPages(pages);
								});
						}}
					>Voltar</button>}
					<p>{page} / {totalPages}</p>
					{page < totalPages && <button
						data-type="load-more"
						onClick={() => {
							const nextPage = page + 1;
							setPage(nextPage);
							productController
								.get({ page: nextPage })
								.then(({ products, pages }) => {
									setProducts(() => {
										return [
											...products,
										];
									});
									setTotalPages(pages);
								});
						}}
					>Proximo</button>}					
				</div>
				<footer className="fixed bottom-0 h-6 w-full bg-gray-400">
					<div className="flex items-center justify-center">@ create by Jack</div>
				</footer>
			</main>			
		</>	
	);
}
