import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function TodoCheckbox({ todo }) {
    const queryClient = useQueryClient();
    const api_url = "http://localhost:3000";

    const [checked, setChecked] = useState(todo.completed)

    async function updateCompleted() {
        try {
            // Toggle locally immediately
            setChecked(!checked);
            const res = await fetch(`${api_url}/updateTodos/${todo.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: !checked,
                }),
            });

            if (!res.ok) {
                throw new Error("Could not update todo");
            }

            queryClient.invalidateQueries({ queryKey: ["getTodos"] });

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <input
            type="checkbox"
            className="todo-checkbox"
            checked={checked}
            onChange={updateCompleted}
        />
    );
}

export default TodoCheckbox;