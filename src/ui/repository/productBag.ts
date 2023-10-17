import { TotalProductBag } from "../schema/productBag";

type UUID = string;

async function insertOnBag(id:UUID) {
	const response = await fetch("../api/productsBag", {
		method: "POST",
		headers: {
			//MIME Type
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id }),
	});

	console.log(id, response);
	return "ok";
}

async function get(): Promise<TotalProductBag> {
	const response = await fetch ("/api/productsBag");  
    
	if (!response.ok){
		throw new Error("Failed to fetch bag total value.");
	}
	return await response.json();     
}

export const proudctBagRepository = {
	insertOnBag,
	get
};
