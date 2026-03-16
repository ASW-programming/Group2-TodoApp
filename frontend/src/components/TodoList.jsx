import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import TodoCheckbox from "./Checkboxes";
import Btn from "./Btn";
import DeleteSVG from "../assets/DeleteSVG";
import { deleteTodo, getTodos, updateTodo } from "../utils/Calls";
import EditSVG from "../assets/EditSVG";
import TodoInput from "./TodoInput.jsx";
import SaveSVG from "../assets/SaveSVG.jsx";

function TodoList() {
	const queryClient = useQueryClient();

	const [editingId, setEditingId] = useState(null);
	const [editedText, setEditedText] = useState("");

	const startEdit = (id, currentTitle) => {
		setEditingId(id);
		setEditedText(currentTitle);
	};

	const handleSaveEdit = async () => {
		console.log("id:", editingId, "text:", editedText);
		await updateTodo(editingId, { title: editedText });
		setEditingId(null);
		await queryClient.invalidateQueries({ queryKey: ["getTodos"] });
	};

	// useQuery för köra funktionen som hämtar datan
	const {
		data: todos,
		isLoading,
		isError,
		error,
	} = useQuery({ queryKey: ["getTodos"], queryFn: getTodos });

	// Säger till query att listan behövs hämtas igen när något plockats bort
	function updateList() {
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
		await deleteTodo(id); // 1. Ta bort från databasen
		updateList(id); // 2. Berätta för föräldern att uppdatera UI:t
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
								{todo.id === editingId ? (
									<>
										<TodoInput
											task={editedText}
											onChange={(e) =>
												setEditedText(e.target.value)
											}
											placeholder="Edit todo"
										/>
										<Btn
											onClick={handleSaveEdit}
											text="Save"
											svg={<SaveSVG />}
										/>
									</>
								) : (
									<span
										style={{
											textDecoration: todo.completed
												? "line-through"
												: "none",
										}}>
										{todo.title}
									</span>
								)}

								<div style={{ display: "flex", gap: "5px" }}>
									{todo.id !== editingId && (
										<Btn
											text="Edit"
											svg={<EditSVG />}
											onClick={() =>
												startEdit(todo.id, todo.title)
											}
										/>
										// <EditBtn
										// 	id={todo.id}
										// 	currentTitle={todo.title}
										// 	onStartEdit={startEdit}
										// />
									)}
									<Btn
										id={todo.id}
										text="Remove"
										svg={<DeleteSVG />}
										onClick={() => handleDelete(todo.id)}
									/>
								</div>
							</li>
						))
				)}
			</ul>
		</div>
	);
}

export default TodoList;
