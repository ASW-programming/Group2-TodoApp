function Btn({ btnText, onDelete, id }) {
	const api_url = "http://localhost:3000";

	async function deleteTodo(id) {
		try {
			// Hämtar ID från databasen
			const response = await fetch(`${api_url}/deleteTodos/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Kunde inte ta bort");
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handleDelete = async () => {
		await deleteTodo(id);
		onDelete(id);
	};

	return (
		<div>
			<button onClick={handleDelete}>{btnText}</button>
		</div>
	);
}

export default Btn;
