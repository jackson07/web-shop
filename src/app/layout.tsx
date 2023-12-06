import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { ProductProvider } from "./context/store";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata: Metadata = {
	title: "Web-Shop",
	description: "Web shop to buy a products",
};

export default function RootLayout({
	children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="pt-BR">
			<UserProvider>
				<body className={"bg-blue-100"}>
					<ProductProvider>{children}</ProductProvider>
				</body>
			</UserProvider>
		</html>
	);
}
