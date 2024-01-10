"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./components/product/productCard";
import Header from "./components/header/header";
import { productController } from "@/ui/controller/product";
import { ToastContainer } from "react-toastify";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

interface HomeProduct {
    id: string;
    name: string;
    description: string;
    value: number;
    photo: string;
}

export default withPageAuthRequired(function Home() {
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
			<Header/>
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
				<ToastContainer />			
				<div className="flex items-center justify-center space-x-3">
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
									window.scrollTo(0, 0);
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
									window.scrollTo(0, 0);
								});
						}}
					>Proximo</button>}					
				</div>
				
			</main>	
			<footer className="bottom-0 h-6 w-full bg-gray-400">
				<div className="flex items-center justify-center">@ create by Jack</div>
			</footer>		
		</>	
	);
}
);
