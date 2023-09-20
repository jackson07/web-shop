import React from "react";
import { BsFillHandbagFill   } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import ProductCard from "./Product/ProductCard";
import Link from "next/link";

export default function Home() {
	return (
		<div>
			<section className="fixed top-0 flex h-10 w-full items-center justify-between bg-red-500 px-4">
				<div className="flex items-center w-80 space-x-10 px-5">
					<Link href="/">
						<div className="text-2xl">Início</div>
					</Link>
					<Link href="/calcas">
						<div className="text-xs text-gray-300">Calças</div>
					</Link>
					<Link href="/camisas">
						<div className="text-xs text-gray-300">Camisas</div>
					</Link>
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
					<ProductCard 
						title="Calça e Camisa" 
						description="Calça e camisa, calça e camisa calça e camisa. Acompanha calça e camisa." 
						price={100.50}/>
					<ProductCard 
						title="Blusa Manga Longa" 
						description="Blusa Manga Longa, Blusa Manga Longa Blusa Manga Longa Blusa Manga Longa." 
						price={99.90}/>
					<ProductCard 
						title="Shorts verão" 
						description="Shorts verão, Shorts verão e Shorts verão. Shorts verão, Shorts verão." 
						price={158.60}/>
					<ProductCard 
						title="Casado Estilo Size" 
						description="Casado Estilo Size, Casado Estilo Size. Casado Estilo Size. Casado Estilo Size." 
						price={199.99}/>
					<ProductCard 
						title="Calça e Camisa" 
						description="Calça e camisa, calça e camisa calça e camisa. Acompanha calça e camisa." 
						price={100.50}/>
					<ProductCard 
						title="Blusa Manga Longa" 
						description="Blusa Manga Longa, Blusa Manga Longa Blusa Manga Longa Blusa Manga Longa." 
						price={99.90}/>
					<ProductCard 
						title="Shorts verão" 
						description="Shorts verão, Shorts verão e Shorts verão. Shorts verão, Shorts verão." 
						price={158.60}/>
					<ProductCard 
						title="Casado Estilo Size" 
						description="Casado Estilo Size, Casado Estilo Size. Casado Estilo Size. Casado Estilo Size." 
						price={199.99}/>
				</div>
			</main>
			<footer className="absolute bottom-0 h-6 w-full bg-red-500">
				<div className="flex items-center justify-center">@ create by Jack</div>
			</footer>
		</div>	
	);
}
