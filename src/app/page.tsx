import React from "react";
import { BsFillHandbagFill   } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";

export default function Home() {
	return (	
		<div>
			<section className="fixed top-0 flex h-10 w-full items-center justify-between bg-red-600 px-4">
				<div className="flex w-80 space-x-10 px-5">
					<button className="text-2xl">Inicio</button>
					<button className="text-xs text-gray-300">Produtos</button>
					<button className="text-xs text-gray-300">Exportar</button>
				</div>
				<input type="text" placeholder="Pesquisar" className="w-96 rounded-full border border-gray-300 px-2 focus:border-gray-500 focus:outline-none" />
				<div className="flex items-start justify-center">
					<button className="relative text-2xl flex items-center justify-center cursor-pointer p-2">
						<BsFillHandbagFill />
					</button>
					<button className="relative text-2xl flex items-center justify-center cursor-pointer p-2">
						<BiSolidUser />
					</button>
				</div>
			</section>
			<main className="max-h-screen overflow-y-auto">
				<div className="grid grid-cols-4 gap-3 p-20">
					<div className="bg-blue-200 p-4 h-72">Coluna 1</div>
					<div className="bg-green-200 p-4">Coluna 2</div>
					<div className="bg-yellow-200 p-4">Coluna 3</div>
					<div className="bg-red-200 p-4">Coluna 4</div>	
					<div className="bg-blue-200 p-4 h-72">Coluna 1</div>
					<div className="bg-green-200 p-4">Coluna 2</div>
					<div className="bg-yellow-200 p-4">Coluna 3</div>
					<div className="bg-red-200 p-4">Coluna 4</div>	
					<div className="bg-blue-200 p-4 h-72">Coluna 1</div>
					<div className="bg-green-200 p-4">Coluna 2</div>
					<div className="bg-yellow-200 p-4">Coluna 3</div>
					<div className="bg-red-200 p-4">Coluna 4</div>					
				</div>
			</main>
			<footer className=" absolute bottom-0 h-10 w-full bg-red-600">
				<div>create by Jack</div>
			</footer>
		</div>	
	);
}
