import { API_URL } from "../utils/Api_url";

async function Delete(id) {
	// Anropar API för att ta bort ifrån DB.
	try {
		// Hämtar ID från databasen
		const response = await fetch(`${API_URL}/deleteTodos/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error("Kunde inte ta bort");
		}
	} catch (error) {
		console.log(error);
	}
}

export default Delete;
