const api_url = "http://localhost:3000";
function TodoForm() {
    const [task, setTask] = useState("");

    // Förhindrar att sidan laddas om vid submit
    const handleSubmit = async (e) => {
        // Stoppar default behavior
        e.preventDefault();

        if (!task.trim()) return;

        // Post 

        try {
            const postTodo = await fetch(`${api_url / addTodo}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: task })

            })
            if (!postTodo.ok) throw new Error("Failed to create todo")

            const data = await postTodo.json();

            console.log("Created todo:", data);


        } catch (error) {
            console.error("Error creating todo:", error);
        }
    }

    return (
        <div>
            <form id="todoForm" onSubmit={handleSubmit}>
                <TodoInput />
                <SubmitBtn />
            </form>
        </div>
    );
}

export default TodoForm;   