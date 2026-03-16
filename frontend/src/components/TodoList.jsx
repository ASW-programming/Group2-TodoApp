import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import TodoCheckbox from "./Checkboxes";
import Btn from "./Btn";
import EditBtn from "./EditBtn";
import SaveBtn from "./SaveBtn";
import TodoInput from "./TodoInput";

function TodoList() {
	const api_url = "http://localhost:3000";
	const queryClient = useQueryClient();

	const [editingId, setEditingId] = useState(null);
	const [editedText, setEditedText] = useState("");

	async function getData() {
		try {
			const res = await fetch(`${api_url}/getTodos`);

			if (!res.ok) {
				throw new Error("Kunde inte hämta todos");
			}

			const data = await res.json();
			return data;
		} catch (error) {
			throw new Error("Could not fetch");
		}
	}

	const {
		data: todos,
		isLoading,
		isError,
		error,
	} = useQuery({ queryKey: ["getTodos"], queryFn: getData });

	function deleteUpdateList() {
		queryClient.invalidateQueries({ queryKey: ["getTodos"] });
	}

	if (isLoading) {
		return <p>laddar todos</p>;
	}

	if (isError) {
		return <p>ett fel uppstod: {error.message}</p>;
	}

	if (!todos) return null;

	const startEdit = (id, currentTitle) => {
		setEditingId(id);
		setEditedText(currentTitle);
	};

	const handleSave = async () => {
		try {
			const response = await fetch(
				`${api_url}/updateTodos/${editingId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: editedText,
					}),
				},
			);

			if (!response.ok) {
				throw new Error("Failed to update todo");
			}

			setEditingId(null);
			queryClient.invalidateQueries({ queryKey: ["getTodos"] });
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
					todos
						.slice()
						.sort((a, b) => {
							if (a.completed !== b.completed) {
								return a.completed - b.completed;
							}
							return a.createdAt._seconds - b.createdAt._seconds;
						})
						.map((todo) => (
							<li key={todo.id} className={`todoList ${todo.completed ? "completed" : ""}`}>
								<TodoCheckbox todo={todo} />

								{todo.id === editingId ? (
									<>
										<TodoInput
											value={editedText}
											onChange={(e) =>
												setEditedText(e.target.value)
											}
											placeholder="Edit todo"
										/>

										<SaveBtn onClick={handleSave} />
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
										<EditBtn
											id={todo.id}
											currentTitle={todo.title}
											onStartEdit={startEdit}
										/>
									)}
									<Btn
										id={todo.id}
										onDelete={deleteUpdateList}
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
