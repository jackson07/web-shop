"use client";
import Header from "@/app/header/header";
import React, { ChangeEvent, useState } from "react";

export default function Produtos() {    
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target?.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setSelectedImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};
      
	return (
		<div>
			<Header />
			<main className="min-h-screen flex items-center justify-center">				
				{/* <form onSubmit={handleSubmit}> */}
				<form className="bg-white p-8 rounded-lg shadow-md w-auto">
					<h2 className="text-2xl font-semibold mb-4">Cadastro de Produto!</h2>
					<div className="flex justify-between space-x-10">
						<div>
							<div className="mb-4">
								<label className="block text-gray-600 mb-1">Produto:</label>
								{/* <input type="text" id="title" value={title} onChange={handleTitleChange} /> */}
								<input type="text" id="title" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300" />
							</div>
							<div className="mb-4">
								<label className="block text-gray-600 mb-1">Descrição::</label>
								{/* <textarea id="description" value={description} onChange={handleDescriptionChange} /> */}
								<textarea id="description" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-600 mb-1">Valor:</label>
								{/* <input type="text" id="value" value={value} onChange={handleValueChange} />  */}
								<input type="text" id="value" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-600 mb-1">Foto:</label>
								{/* <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} /> */}
								<input type="file" accept="image/*" id="photo" onChange={handlePhotoChange} className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"/>						
							</div>
						</div>					
						{selectedImage && (
							<div className="mb-4">
								<label className="block text-gray-600 mb-1">Imagem Selecionada:</label>
								<img src={selectedImage} alt="Imagem Selecionada" className="max-w-xs" />
							</div>
						)}
					</div>
					<button type="submit" className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-600">Gravar</button>
				</form>
				
			</main>
		</div>
	);
}
