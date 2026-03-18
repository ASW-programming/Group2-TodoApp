import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { postTodos } from "../utils/Calls";
import Btn from "./Btn";
import PostSVG from "../assets/PostSVG";
import TodoInput from "./TodoInput";

function TodoForm() {
	const [todo, setTodo] = useState("");
	const queryClient = useQueryClient();

	// Säger till query att listan behövs hämtas igen när något plockats bort
	async function updateList() {
		await queryClient.invalidateQueries({ queryKey: ["getTodos"] });
	}

	// Förhindrar att sidan laddas om vid submit
	const handleSubmit = async (e) => {
		// Stoppar default behavior
		e.preventDefault();
		// Kolla ifall input är tomt
		if (!todo.trim()) return;

		await postTodos(todo);

		updateList();

		setTodo("");
	};

	return (
		<div>
			<form id="todoForm" onSubmit={handleSubmit}>
				{/* Skickar todo och setTodo till TodoInput via props */}
				<TodoInput
					value={todo}
					setTodo={setTodo}
					placeholder="Add todo"
					onChange={(e) => setTodo(e.target.value)}
					className="todoInput"
					type="text"
				/>
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
