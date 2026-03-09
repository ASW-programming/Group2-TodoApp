function Btn(props) {
	const api_url = "http://localhost:3000";

	// Anropar API för att ta bort ifrån DB.
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

	// Funktion för att ta bort ifrån databasen
	const handleDelete = async () => {
		await deleteTodo(props.id); // 1. Ta bort från databasen
		props.onDelete(props.id); // 2. Berätta för föräldern att uppdatera UI:t
	};

	return (
		<div>
			<button onClick={handleDelete}>{props.btnText}</button>
		</div>
	);
}

export default Btn;
