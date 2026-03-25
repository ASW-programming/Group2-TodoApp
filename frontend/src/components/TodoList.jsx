import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteTodo, getTodos, updateTodo } from "../utils/Calls";
import TodoInput from "./TodoInput.jsx";
import Btn from "./Btn";
import DeleteSVG from "../assets/DeleteSVG";
import EditSVG from "../assets/EditSVG";
import SaveSVG from "../assets/SaveSVG.jsx";
import CancelSVG from "../assets/CancelSVG.jsx";

function TodoList() {
	const queryClient = useQueryClient();

	const [editingId, setEditingId] = useState(null);
	const [editedText, setEditedText] = useState("");

	const {
		data: todos,
		isLoading,
		isError,
		error,
	} = useQuery({ queryKey: ["getTodos"], queryFn: getTodos });

	if (isLoading) {
		return <p>Loading todos</p>;
	}

	if (isError) {
		return <p>An Error Occurred: {error.message}</p>;
	}

	// Säger till useQuery att listan behövs hämtas igen när något plockats bort
	async function updateList() {
		await queryClient.invalidateQueries({ queryKey: ["getTodos"] });
	}

	const startEdit = (id, currentTitle) => {
		setEditingId(id);
		setEditedText(currentTitle);
	};

	const handleSaveEdit = async () => {
		if (!editedText.trim()) return;

		await updateTodo(editingId, { title: editedText });

		setEditingId(null);

		// queryClient
		await updateList();
	};

	const handleCheckboxes = async (todo) => {
		await updateTodo(todo.id, { completed: !todo.completed });

		// queryClient
		await updateList();
	};

	// Funktion för att ta bort ifrån databasen
	const handleDelete = async (id) => {
		await deleteTodo(id); // 1. Ta bort från databasen
		await updateList(); // 2. Berätta för föräldern att uppdatera UI:t
	};

	return (
		<div>
			<ul id="todoList">
				{todos.length === 0 ? (
					<p>Inga todos än!</p>
				) : (
					todos
						.slice()
						.sort((a, b) => {
							if (a.completed !== b.completed) {
								return a.completed - b.completed;
							}
							return a.createdAt._seconds - b.createdAt._seconds;
						})
						.map((todo) => (
							<li
								key={todo.id}
								className={`todoList ${todo.completed ? "completed" : ""}`}>
								<TodoInput
									checked={todo.completed}
									onChange={() => handleCheckboxes(todo)}
									type="checkbox"
									className="todoCheckbox"
								/>

								{todo.id === editingId ? (
									<div className="editMode">
										<TodoInput
											value={editedText}
											onChange={(e) =>
												setEditedText(e.target.value)
											}
											placeholder="Edit todo"
											className="todoInput"
										/>

										{/* Save Btn */}
										<Btn
											btnClassName="btn"
											onClick={handleSaveEdit}
											spanText="Save"
											svg={<SaveSVG />}
											spanClassName="btnText narrow"
										/>
										{/* Cancel Btn */}
										<Btn
											btnClassName="btn"
											onClick={() => setEditingId(null)}
											spanText="Cancel"
											svg={<CancelSVG />}
											spanClassName="btnText"
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
										// Edit Btn
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
									{todo.id !== editingId && (
										// Delete Btn
										<Btn
											btnClassName="btn"
											spanText="Delete"
											svg={<DeleteSVG />}
											onClick={() =>
												handleDelete(todo.id)
											}
											spanClassName="btnText"
										/>
									)}
								</div>
							</li>
						))
				)}
			</ul>
		</div>
	);
}

export default TodoList;
