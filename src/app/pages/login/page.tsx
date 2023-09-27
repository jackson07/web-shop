"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Loguin() {
	const [register, setRegister] = useState(false);

	function handleClick() {
		setRegister(!register);
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			{!register ?  (
				<div className="bg-white p-8 rounded-lg shadow-md w-96">				
					<h2 className="text-2xl font-semibold mb-4">Faça o Login!</h2>				
					<div className="mb-4">
						<label className="block text-gray-600 mb-1" >Usuário:</label>
						<input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"></input>
					</div>
					<div className="mb-4">
						<label className="block text-gray-600 mb-1" >Senha:</label>
						<input type="password" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"></input>
					</div>
					<div className="mb-4 flex justify-between">
						<button className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
						<button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400" onClick={handleClick}>Registrar</button>
						<button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
							<Link href="/">
                                Início
							</Link>
						</button>					
					</div>
				</div>
			)
				:
				(
					<div className="bg-white p-8 rounded-lg shadow-md w-96">				
						<h2 className="text-2xl font-semibold mb-4">Faça o Cadastro!</h2>	
						<div className="mb-4">
							<label className="block text-gray-600 mb-1" >E-mail:</label>
							<input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"></input>
						</div>			
						<div className="mb-4">
							<label className="block text-gray-600 mb-1" >Usuário:</label>
							<input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"></input>
						</div>
						<div className="mb-4">
							<label className="block text-gray-600 mb-1" >Senha:</label>
							<input type="password" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"></input>
						</div>
						<div className="mb-4 flex justify-between">
							<button className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-600">Registrar</button>
							<button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400" onClick={handleClick}>Login</button>
							<button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
								<Link href="/">
                                    Início
								</Link>
							</button>					
						</div>
					</div>
				)}
		</div>
	);
}
