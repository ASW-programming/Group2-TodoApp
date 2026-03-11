import { useQueryClient } from "@tanstack/react-query";

function TodoCheckbox({ todo }) {
    const queryClient = useQueryClient();
    const api_url = "http://localhost:3000";

    async function updateCompleted() {
        try {
            setChecked(!checked); // this makes the user see the toggled checkbox instantly on click
            const res = await fetch(`${api_url}/updateTodos/${todo.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                }),
            });

            if (!res.ok) {
                throw new Error("Could not update todo");
            }

            // refresh todo list
            queryClient.invalidateQueries({ queryKey: ["getTodos"] });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <input
            type="checkbox"
            className="todo-checkbox"
            checked={todo.completed}
            onChange={updateCompleted}
        />
    );
}

export default TodoCheckbox;