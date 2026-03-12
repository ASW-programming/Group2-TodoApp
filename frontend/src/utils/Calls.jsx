const API_URL = "http://localhost:3000";

// Functionen som hämtar data som vi sedan lägger i listan
export const getTodos = async () => {
	try {
		const res = await fetch(`${API_URL}/getTodos`);

		if (!res.ok) {
			throw new Error("Kunde inte hämta todos");
		}

		// Omvandla response till JSON så det kan användas.
		const data = await res.json();
		return data;
	} catch (error) {
		console.log("Could not fetch todos");
	}
};

export const postTodos = async (title) => {
	// Post
	try {
		const postTodo = await fetch(`${API_URL}/addTodo`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title }),
		});
		if (!postTodo.ok) throw new Error("Failed to create todo");
		const data = await postTodo.json();
		console.log("Created todo:", data);
		return data;
	} catch (error) {
		console.error("Error creating todo:", error);
	}
};

export const deleteTodo = async (id) => {
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
};
