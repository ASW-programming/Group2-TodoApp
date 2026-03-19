const API_URL = "http://localhost:3000";

// Funktionen som hämtar data som vi sedan lägger i listan
export const getTodos = async () => {
	try {
		const res = await fetch(`${API_URL}/getTodos`);

		if (!res.ok) {
			throw new Error("Could not get todos");
		}

		// Omvandla response till JSON så det kan användas.
		const data = await res.json();
		return data;
	} catch (error) {
		throw new Error(`Could not fetch todos: ${error.message}`);
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

		if (!postTodo.ok) {
			throw new Error("Failed to create todo");
		}

		const data = await postTodo.json();
		console.log("Created todo:", data);

		return data;
	} catch (error) {
		throw new Error(`Could not create todo: ${error.message}`);
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
			throw new Error("Could not delete");
		}

		console.log(`Deleted todo ${id}`);
	} catch (error) {
		throw new Error(`Could not delete todos: ${error.message}`);
	}
};

export const updateTodo = async (id, updates) => {
	try {
		const response = await fetch(`${API_URL}/updateTodos/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updates),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to update todo: ${response.status} - ${data}`,
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Could not update todos: ${error.message}`);
	}
};
