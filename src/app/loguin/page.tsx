import React from "react";

export default function Loguin() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-96">				
				<h2 className="text-2xl font-semibold mb-4">Faça o Loguin!</h2>				
				<div className="mb-4">
					<label className="block text-gray-600 mb-1" >Loguin:</label>
					<input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"></input>
				</div>
				<div className="mb-4">
					<label className="block text-gray-600 mb-1" >Senha:</label>
					<input type="password" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-300"></input>
				</div>
				<div className="mb-4 flex justify-between">
					<button className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
					<button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Registrar</button>
				</div>
			</div>
		</div>
	);
}

{/*<div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="username" 
          className="block text-gray-600 mb-1">Nome de Usuário ou Email</label>
          <input type="text" id="username" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" 
          className="block text-gray-600 mb-1">Senha</label>
          <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400" />
        </div>
        <div className="mb-4 flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Registrar</button>
        </div>
      </div>
    </div>*/}
