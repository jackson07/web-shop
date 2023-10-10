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
		<div>			
			<Header/>
			<main className="min-h-screen flex flex-col items-center justify-center">
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
							/>                              
						);
					})}					
				</div>				
				<div className="flex items-center justify-center pt-40 space-x-3">
					<p>{page} / {totalPages}</p>
					{page < totalPages && <button
						data-type="load-more"
						onClick={() => {
							setIsLoading(true);
							const nextPage = page + 1;
							setPage(nextPage);
							productController
								.get({ page: nextPage })
								.then(({ products, pages }) => {
									setProducts(() => {
										return [
											//...oldProducts,
											...products,
										];
									});
									setTotalPages(pages);
								})
								.finally(() => {
									setIsLoading(false);
								});
						}}
					>Proximo</button>}
					{(page <= totalPages) && !(page <= 1) && <button
						onClick={() => {
							setIsLoading(true);
							const nextPage = page - 1;
							setPage(nextPage);
							productController
								.get({ page: nextPage })
								.then(({ products, pages }) => {
									setProducts(() => {
										return [
											//...oldProducts,
											...products,
										];
									});
									setTotalPages(pages);
								})
								.finally(() => {
									setIsLoading(false);
								});
						}}
					>Voltar</button>}
				</div>
			</main>
			<footer className="h-6 w-full bg-gray-400">
				<div className="flex items-center justify-center">@ create by Jack</div>
			</footer>
		</div>	
	);
}
