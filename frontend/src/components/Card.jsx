import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function Card() {
	return (
		<div className="card">
			<div className="cardBorder">
				<h2 className="todoTitle">MY TODOS</h2>
				<TodoForm />
				<TodoList />
			</div>
		</div>
	);
}

export default Card;
