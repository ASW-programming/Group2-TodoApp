function TodoForm() {
    const [task, setTask] = useState("");

    // Förhindrar att sidan laddas om vid submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!task.trim()) return;
    }

    return (
        <div>
            <form id="todoForm" onSubmit={handleSubmit}>

            </form>
        </div>
    );
}

export default TodoForm;    
