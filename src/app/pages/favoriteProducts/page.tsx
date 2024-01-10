"use client";
import Header from "@/app/components/header/header";
import { useProductData } from "@/app/context/store";
import { favoritePoductsController } from "@/ui/controller/favoriteProducts";
import formatCurrency from "@/utils/formatCurrency";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

interface FavoriteProducts {
    id: string;
    name: string;
    description: string;
    value: number;
    photo: string;
}

export default function FavoriteProducts() {
	const [products,setProducts] = useState<FavoriteProducts[]>([]);
	const { idProducts, updateProducts } = useProductData();
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;
	if (!user) return redirect("/pages/login");

	useEffect(() => {
		favoritePoductsController.get().then(({ products }) => {
			setProducts(products);
		});
	}, []);
    
	const extractedIDs = idProducts.map(prod => prod.id_products);
	const filteredProducts = products.filter((product) =>
		extractedIDs.includes(product.id)
	);
	return (
		<>			
			<Header/>			
			<main className="min-h-screen flex items-center justify-center">
				<div className="bg-white p-8 rounded-lg shadow-md w-4/5" style={{ height: "80vh" }}>
					<div className="h-full overflow-y-auto">
						<table className="w-full bg-blue-200">
							<thead className="">
								<tr>
									<th>Seq</th>
									<th>ID</th>
									<th>Nome do Produto</th>
									<th>Descrição do Produto</th>
									<th>Valor</th>
									<th>Excluir</th>
								</tr>
							</thead>                                          
							<tbody>                                
								{filteredProducts.map((products,index)=> {
									return (
										<tr key={products.id}>
											<td>{index+1}</td>
											<td align="center">{products.id.substring(0, 4)}</td>
											<td align="center">{products.name}</td>
											<td align="center">{products.description}</td>
											<td align="right">{formatCurrency(products.value, "BRL")}</td>
											<td align="center">
												<div>
													<button onClick={() => {
														favoritePoductsController
															.deleteFromBag(products.id)
															.then(() => {updateProducts();});														
													}}>
														<MdDelete />
													</button>
												</div>
											</td>
										</tr> 
									);
								})}									
							</tbody>
						</table>
					</div>
				</div>
			</main>
			
		</>
	);
}
