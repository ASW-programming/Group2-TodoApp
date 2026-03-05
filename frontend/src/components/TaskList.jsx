import { useQuery } from "@tanstack/react-query";

function TaskList() {
	const link = "http://localhost:3000";

	async function getData() {
		try {
			const res = await fetch(`${link}/getTodos`);

			if (!res.ok) {
				throw new Error("Kunde inte hämta todos");
			}

			const data = await res.json();
			return data;
		} catch (error) {
			console.log("Could not fetch todos");
		}
	}

	const {
		data: todos,
		isLoading,
		isError,
		error,
	} = useQuery({ queryKey: ["getTodos"], queryFn: getData });

	if (isLoading) {
		return <p>laddar todos</p>;
	}

	if (isError) {
		return <p>ett fel uppstod: {error.message}</p>;
	}

	return (
		<div>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>{todo.title}</li>
				))}
			</ul>
		</div>
	);
}

export default TaskList;
