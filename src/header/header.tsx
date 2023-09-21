import React from "react";
import Link from "next/link";
import { BsFillHandbagFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";

const Header = () => {
	return (
		<nav className="fixed top-0 flex h-10 w-full items-center justify-between bg-red-500 px-4">
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
			<input
				type="text"
				placeholder="Pesquisar"
				className="w-96 rounded-full border border-gray-300 px-2 focus:border-gray-500 focus:outline-none"
			/>
			<div className="flex items-start justify-center">
				<Link href="/sacola" className="relative text-2xl flex items-center justify-center cursor-pointer p-2">
					<BsFillHandbagFill />
				</Link>
				<Link href="/loguin" className="relative text-2xl flex items-center justify-center cursor-pointer p-2">
					<BiSolidUser />
				</Link>
				{/* <button className="relative text-2xl flex items-center justify-center cursor-pointer p-2">
					<BsFillHandbagFill />
				</button>
				<button className="relative text-2xl flex items-center justify-center cursor-pointer p-2">
					<BiSolidUser />
				</button> */}
			</div>
		</nav>
	);
};

export default Header;
