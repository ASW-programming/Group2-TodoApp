import { useState } from "react";
import TodoInput from "./TodoInput";
import SubmitBtn from "./SubmitBtn";
import { useQueryClient } from "@tanstack/react-query";

const api_url = "http://localhost:3000";

function TodoForm() {
	const [task, setTask] = useState("");

	const queryClient = useQueryClient();

	// Förhindrar att sidan laddas om vid submit
	const handleSubmit = async (e) => {
		// Stoppar default behavior
		e.preventDefault();
		// Kolla ifall input är tomt
		if (!task.trim()) return;

		// Post
		try {
			const postTodo = await fetch(`${api_url}/addTodo`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title: task }),
			});
			if (!postTodo.ok) throw new Error("Failed to create todo");
			const data = await postTodo.json();
			setTask("");

			queryClient.invalidateQueries({ queryKey: ["getTodos"] });

			console.log("Created todo:", data);
		} catch (error) {
			console.error("Error creating todo:", error);
		}
	};

	return (
		<div>
			<form id="todoForm" onSubmit={handleSubmit}>
				{/* Skickar task och setTask till TodoInput via props */}
				<TodoInput
					task={task}
					setTask={setTask}
					placeholder="Add todo"
					onChange={(e) => setTask(e.target.value)}
				/>
				<SubmitBtn />
			</form>
		</div>
	);
}

export default TodoForm;
