import React from "react";
import ProductCard from "./Product/ProductCard";
import Header from "./header/header";

export default function Home() {
	return (
		<div>			
			<Header/>
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
			<footer className="absolute bottom-0 h-6 w-full bg-gray-400">
				<div className="flex items-center justify-center">@ create by Jack</div>
			</footer>
		</div>	
	);
}
