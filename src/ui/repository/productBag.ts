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

export const proudctBagRepository = {
	insertOnBag
};
