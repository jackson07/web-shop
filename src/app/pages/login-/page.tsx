"use client";
import React from "react";
import Link from "next/link";
import Messages from "./messages";


export default function Loguin() {
	return (
		<form 
			className="min-h-screen flex items-center justify-center"
			action="/auth/sign-in"
			method="post" 
		>
			<div className="bg-white p-8 rounded-lg shadow-md w-96">				
				<h2 className="text-2xl font-semibold mb-4">Faça o Login!</h2>				
				<div className="mb-4">
					<label className="block text-gray-600 mb-1" >Usuário:</label>
					<input 
						className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"
						name="email"
						placeholder="voce.nome@exemplo.com"
						required
					></input>
				</div>
				<div className="mb-4">
					<label className="block text-gray-600 mb-1" >Senha:</label>
					<input 
						type="password"
						name="password"
						placeholder="••••••••"
						required
						className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"></input>
				</div>
				<div className="mb-4 flex justify-between">
					<button className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
					<button 
						formAction="/auth/sign-up"                    
						className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
					>
                            Registrar
					</button>
					<button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
						<Link href="/">
                                Início
						</Link>
					</button>	
					<Messages />				
				</div>
			</div>
		</form>
	);
}
