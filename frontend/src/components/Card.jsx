import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function Card() {
	return (
		<div className="card">
			<div className="cardBorder">
				<TodoForm />
				<TodoList />
			</div>
		</div>
	);
}

export default Card;
