import React from "react";
import Link from "next/link";
import { BsFillHandbagFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";

const Header = () => {
	return (
		<nav className="fixed top-0 flex h-10 w-full justify-between items-center bg-gray-400 px-4">
			<div className="flex items-center w-80 space-x-10 px-5">
				<Link href="/">
					<div className="text-2xl">Início</div>
				</Link>				
				<Link href="/pages/register">
					<div className="text-xs">Cadastro</div>
				</Link>
			</div>
			<input
				type="text"
				placeholder="Pesquisar"
				className="w-96 rounded-lg border border-gray-300 px-2 focus:border-gray-500 focus:outline-none"
			/>
			<div className="flex items-center justify-center">
				<Link href="/" className="text-2xl flex items-center cursor-pointer px-2">
					<BsFillHandbagFill/>
					<p className="text-xs font-semibold flex bottom-0 text-end pt-3">05</p>
				</Link>
				<Link href="/pages/login" className="relative text-2xl flex items-center justify-center cursor-pointer p-2">
					<BiSolidUser />
				</Link>
			</div>
		</nav>
	);
};

export default Header;
