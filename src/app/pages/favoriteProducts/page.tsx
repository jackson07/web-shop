"use client";
import Header from "@/app/components/header/header";
import formatCurrency from "@/utils/formatCurrency";
import React from "react";
import { MdDelete } from "react-icons/md";

export default function FavoriteProducts() {
	const numberOfRows = 50;
	return (
		<>
			<Header/>
			<main className="min-h-screen flex items-center justify-center">
				<div className="bg-white p-8 rounded-lg shadow-md w-4/5" style={{ height: "80vh" }}>
					<div className="h-full overflow-y-auto">
						<table className="w-full bg-blue-200">
							<thead className="">
								<tr>
									<th>ID</th>
									<th>Nome do Produto</th>
									<th>Descrição do Produto</th>
									<th>Valor</th>
									<th>Excluir</th>
								</tr>
							</thead>                        
							{/* <tbody>
							<tr>
								<td align="center">
                                idtest
								</td>
								<td align="center">
                                nametest
								</td>
								<td align="center">
                                descricaotest
								</td>
								<td align="center">
									{formatCurrency(50.00,"BRL")}
								</td>
								<td align="center">
									<div>
										<MdDelete />
									</div>
								</td>
							</tr>							                     
						    </tbody> */}
							<tbody>
								{Array.from({ length: numberOfRows }, (_, index) => (
									<tr key={index}>
										<td align="center">idtest</td>
										<td align="center">nametest</td>
										<td align="center">descricaotest</td>
										<td align="center">{formatCurrency(50.00, "BRL")}</td>
										<td align="center">
											<div>
												<MdDelete />
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</>
	);
}
