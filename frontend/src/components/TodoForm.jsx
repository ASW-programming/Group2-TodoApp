import { useState } from "react";
import TodoInput from "./TodoInput";
import { useQueryClient } from "@tanstack/react-query";
import Btn from "./Btn";
import PostSVG from "../assets/PostSVG";
import { postTodos } from "../utils/Calls";

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

		await postTodos(task);

		queryClient.invalidateQueries({ queryKey: ["getTodos"] });

		setTask("");
	};

	return (
		<div>
			<form id="todoForm" onSubmit={handleSubmit}>
				{/* Skickar task och setTask till TodoInput via props */}
				<TodoInput task={task} setTask={setTask} />
				<Btn
					text="Submit"
					svg={<PostSVG />}
					type="submit"
					id="submitBtn"
				/>
			</form>
		</div>
	);
}

export default TodoForm;
