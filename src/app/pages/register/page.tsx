"use client";
import Header from "@/app/components/header/header";
import React, { ChangeEvent, useState, useRef } from "react";
import Link from "next/link";
import { productController } from "@/ui/controller/product";

export default function Produtos() {    
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [image, setImage] = useState<File>();
	const productInputRef = useRef<HTMLInputElement>(null);
	const descriprionInputRef = useRef<HTMLInputElement>(null);
	const valueInputRef = useRef<HTMLInputElement>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);
    

	const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target?.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setSelectedImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
		setImage(file);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();		
		productController.create({
			name: productInputRef.current?.value as string,
			description: descriprionInputRef.current?.value as string,
			value: Number(valueInputRef.current?.value),
			photo: image as File,
			onSuccess(message) {
				alert(message);
                productInputRef.current!.value = "";
                descriprionInputRef.current!.value = "";
                valueInputRef.current!.value = "";
                imageInputRef.current!.value = "";
                setSelectedImage(null);
			},
			onError(message){
				alert(message);  
			}
		});   
	};

	return (
		<div>
			<Header />
			<main className="min-h-screen flex items-center justify-center">	
				<form
					onSubmit={handleSubmit}
					className="bg-white p-8 rounded-lg shadow-md w-auto">
					<h2 className="text-2xl font-semibold mb-4">Cadastro de Produto!</h2>
					<div className="flex justify-between space-x-10">
						<div>
							<div className="mb-4">
								<label 
									className="block text-gray-600 mb-1">
                                        Produto:
								</label>
								<input 
									type="text" 
									ref={productInputRef} 
									placeholder="Nome do produto" 
									className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300" />
							</div>
							<div 
								className="mb-4">
								<label 
									className="block text-gray-600 mb-1">                                        
                                        Descrição::
								</label>
								<input 
									type="text"
									ref={descriprionInputRef} 
									placeholder="Descrição do produto"
									className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-600 mb-1">
                                    Valor:
								</label>
								<input 
									type="number" 
									ref={valueInputRef}
									className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"/>
							</div>
							<div 
								className="mb-4">
								<label 
									className="block text-gray-600 mb-1">
                                    Foto:
								</label>
								<input 
									type="file" 
									accept="image/*" 
									ref={imageInputRef}
									onChange={(e) => {handleImage(e);}} 
									className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"/>						
							</div>
						</div>					
						{selectedImage && (
							<div className="mb-4">
								<label 
									className="block text-gray-600 mb-1">
                                    Imagem Selecionada:
								</label>
								<img 
									src={selectedImage} 
									alt="Imagem Selecionada" 
									className="max-w-xs" />
							</div>
						)}
					</div>
					<div className="flex items-center space-x-40 p-6 left-0">
						<button 
							type="submit" 
							className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Gravar
						</button>
						<button 
							className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
							<Link href="/">
                                Voltar
							</Link>
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}
