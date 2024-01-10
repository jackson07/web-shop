"use client";
import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function Login() {
	const { user, error, isLoading } = useUser();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>{error.message}</div>;  
	return (
		( !user ? <div className="min-h-screen flex items-center justify-center">			
			<div className="bg-white p-8 rounded-lg shadow-md w-96">                			
				<h2 className="text-2xl font-semibold mb-4">Faça o Login!</h2>		
				<button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
					<a href="/api/auth/login?returnTo=/pages/login">Login</a>
				</button>
			</div>
		</div>
			:
			<div className="min-h-screen flex items-center justify-center">			
				<div className="bg-white p-8 rounded-lg shadow-md w-96 space-y-6">                			
					<h2 className="text-2xl font-semibold mb-4">Bem vindo, {user.name}!</h2>	
					<p>Email: {user.email}</p>	
					<img 
						src={user.picture as string}
						alt={user.name as string} 
					/>
					<div className="flex space-x-4">
						<button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
							<Link href={"/"}>Página Inicial</Link>
						</button>
						<button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
							<a href="/api/auth/logout">Logout</a>
						</button>    
					</div>						
				</div>
			</div>
		)  
	);	
}
