import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteTodo, getTodos, updateTodo } from "../utils/Calls";
import TodoInput from "./TodoInput.jsx";
import Btn from "./Btn";
import DeleteSVG from "../assets/DeleteSVG";
import EditSVG from "../assets/EditSVG";
import SaveSVG from "../assets/SaveSVG.jsx";

function TodoList() {
	const queryClient = useQueryClient();

	const [editingId, setEditingId] = useState(null);
	const [editedText, setEditedText] = useState("");

	// useQuery för köra funktionen som hämtar datan
	const {
		data: todos,
		isLoading,
		isError,
		error,
	} = useQuery({ queryKey: ["getTodos"], queryFn: getTodos });

	// Om connection är långsam
	if (isLoading) {
		return <p>Loading todos</p>;
	}

	// Ifall fetch misslyckas.
	if (isError) {
		return <p>An Error Occurred: {error.message}</p>;
	}

	// Säger till query att listan behövs hämtas igen när något plockats bort
	async function updateList() {
		await queryClient.invalidateQueries({ queryKey: ["getTodos"] });
	}

	const startEdit = (id, currentTitle) => {
		setEditingId(id);
		setEditedText(currentTitle);
	};

	const handleSaveEdit = async () => {
		console.log("id:", editingId, "text:", editedText);
		await updateTodo(editingId, { title: editedText });
		setEditingId(null);

		// queryClient
		updateList();
	};

	const handleCheckboxes = async (todo) => {
		await updateTodo(todo.id, { completed: !todo.completed });

		// queryClient
		updateList();
	};

	// Funktion för att ta bort ifrån databasen
	const handleDelete = async (id) => {
		await deleteTodo(id); // 1. Ta bort från databasen
		await updateList(id); // 2. Berätta för föräldern att uppdatera UI:t
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
							<li
								key={todo.id}
								className={`todoList ${todo.completed ? "completed" : ""}`}>
								<TodoInput
									todo={todo}
									checked={todo.completed}
									onChange={() => handleCheckboxes(todo)}
									type="checkbox"
									className="todoCheckbox"
								/>

								{todo.id === editingId ? (
									<div
										className="editMode"
										style={{ display: "flex" }}>
										<TodoInput
											value={editedText}
											onChange={(e) =>
												setEditedText(e.target.value)
											}
											placeholder="Edit todo"
											className="todoInput"
										/>
										<Btn
											btnClassName="btn"
											onClick={handleSaveEdit}
											spanText="Save"
											svg={<SaveSVG />}
											spanClassName="btnText narrow"
										/>
									</div>
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
											btnClassName="btn"
											spanText="Edit"
											svg={<EditSVG />}
											onClick={() =>
												startEdit(todo.id, todo.title)
											}
											spanClassName="btnText narrow"
										/>
									)}
									<Btn
										btnClassName="btn"
										id={todo.id}
										spanText="Delete"
										svg={<DeleteSVG />}
										onClick={() => handleDelete(todo.id)}
										spanClassName="btnText"
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
