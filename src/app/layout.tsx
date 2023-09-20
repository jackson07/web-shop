import React from "react";
import "./globals.css";
import type { Metadata } from "next";

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
			<body className={"bg-blue-100"}>{children}</body>
		</html>
	);
}
