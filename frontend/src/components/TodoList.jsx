import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import TodoCheckbox from "./Checkboxes";
import Btn from "./Btn";
import EditBtn from "./EditBtn";
import SaveBtn from "./SaveBtn";

function TodoList() {
	const api_url = "http://localhost:3000";
	const queryClient = useQueryClient();

	// Sparar id:t för den todo som redigeras
	// null = ingen todo redigeras
	const [editingId, setEditingId] = useState(null);
	// Sparar texten som användaren skriver i input-fältet
	// när en todo är i edit-mode
	const [editedText, setEditedText] = useState("");

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

	// Startar edit-mode för vald todo
	// Sparar todo:ns id och nuvarande titel i state
	const startEdit = (id, currentTitle) => {
		setEditingId(id);
		setEditedText(currentTitle);
	};

	const handleSave = async () => {
		try {
			const response = await fetch(`${api_url}/updateTodos/${editingId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					title: editedText
				})
			});

			if (!response.ok) {
				throw new Error("Failed to update todo");
			}

			// Stänger edit-mode
			setEditingId(null); 
			// Säger till query att hämta listan igen
			// Lägg till den redigerade todon
			queryClient.invalidateQueries(["getTodos"]);
			

		} catch (error) {
				console.error(error);
		}
	};

	return (
		<div>
			<ul id="todoList">
				{todos.length === 0 ? (
					<p>Inga todos än!</p>
				) : (
					todos.map((todo) => (
						<li key={todo.id} className="todoList">
							<TodoCheckbox todo={todo} />
							
							
							{/* Om todo.id matchar editingId: visa input-fält för redigering
						Annars: visa vanlig titel (todo.title) */}
						{
							todo.id === editingId
								? (
									<>
									<input
										value={editedText}
										onChange={(e) => setEditedText(e.target.value)}
											/>
											<SaveBtn onClick={handleSave}/>
									</>
								)
							: 
							<span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
										{todo.title}
										</span>
								}
								
						<div style= {{display: "flex", gap: "5px"}}>
						<EditBtn
							id={todo.id}
							currentTitle={todo.title}
							onStartEdit={startEdit}
						/> 
								<Btn id={todo.id} onDelete={deleteUpdateList} />
								</div>
						</li>
					))
				)}
			</ul>
		</div>
	);
}

export default TodoList;
