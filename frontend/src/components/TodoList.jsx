import { useQuery, useQueryClient } from "@tanstack/react-query";
import TodoCheckbox from "./Checkboxes";
import Btn from "./Btn";
import DeleteSVG from "../assets/DeleteSVG";
import Delete from "../utils/Delete";
import { API_URL } from "../utils/Api_url";

function TodoList() {
	const queryClient = useQueryClient();

	// Functionen som hämtar data som vi sedan lägger i listan
	async function getData() {
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
	}

	// useQuery för köra funktionen som hämtar datan
	const {
		data: todos,
		isLoading,
		isError,
		error,
	} = useQuery({ queryKey: ["getTodos"], queryFn: getData });

	// Säger till query att listan behövs hämtas igen när något plockats bort
	function deleteUpdateList() {
		queryClient.invalidateQueries({ queryKey: ["getTodos"] });
	}

	// Om connection är långsam
	if (isLoading) {
		return <p>laddar todos</p>;
	}

	// Ifall fetch misslyckas.
	if (isError) {
		return <p>ett fel uppstod: {error.message}</p>;
	}

	// Funktion för att ta bort ifrån databasen
	const handleDelete = async (id) => {
		await Delete(id); // 1. Ta bort från databasen
		props.onDelete(id); // 2. Berätta för föräldern att uppdatera UI:t
	};

	return (
		<div>
			<ul id="todoList">
				{/* Listan för alla todos */}
				{todos.length === 0 ? (
					<p>Inga todos än!</p>
				) : (
					todos
						// Skapa en kopia av arrayen
						.slice()

						// Sortera listan efter sekunder-skapad och efter completed true/false
						.sort((a, b) => {
							if (a.completed !== b.completed) {
								return a.completed - b.completed; // Ofärdiga först
							}
							return a.createdAt._seconds - b.createdAt._seconds; // Äldst först inom gruppen
						})
						.map((todo) => (
							<li key={todo.id} className="todoList">
								<TodoCheckbox todo={todo} />
								<span
									style={{
										textDecoration: todo.completed
											? "line-through"
											: "none",
									}}>
									{todo.title}
								</span>
								<Btn
									id={todo.id}
									text="Remove"
									svg={<DeleteSVG />}
									onClick={() => handleDelete(todo.id)}
								/>
							</li>
						))
				)}
			</ul>
		</div>
	);
}

export default TodoList;
