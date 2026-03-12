import { useQuery, useQueryClient } from "@tanstack/react-query";
import TodoCheckbox from "./Checkboxes";
import Btn from "./Btn";

function TodoList() {
	const api_url = "http://localhost:3000";
	const queryClient = useQueryClient();

	// Functionen som hämtar data som vi sedan lägger i listan
	async function getData() {
		try {
			const res = await fetch(`${api_url}/getTodos`);

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
		queryClient.invalidateQueries(["getTodos"]);
	}

	// Om connection är långsam
	if (isLoading) {
		return <p>laddar todos</p>;
	}

	// Ifall fetch misslyckas.
	if (isError) {
		return <p>ett fel uppstod: {error.message}</p>;
	}

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
								<Btn id={todo.id} onDelete={deleteUpdateList} />
							</li>
						))
				)}
			</ul>
		</div>
	);
}

export default TodoList;
