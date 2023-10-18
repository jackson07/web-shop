"use client";
import Header from "@/app/components/header/header";
import React from "react";

export default function FavoriteProducts() {
	return (
		<>
			<Header/>
			<main className="min-h-screen flex items-center justify-center">
				<div className="bg-white p-8 rounded-lg shadow-md w-4/5 h-full">
					<table className="w-full h-full bg-purple-400">
						<thead className="">
							<tr>
								<th>id</th>
								<th>name</th>
								<th>descricao</th>
								<th>valor</th>
								<th>opcoes</th>
							</tr>
						</thead>
						<tbody>
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
                                valortest
								</td>
								<td align="center">
                                opcoestest
								</td>
							</tr>							                     
						</tbody>
					</table>
				</div>
			</main>
		</>
	);
}
