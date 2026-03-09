import { useState } from 'react';
import TodoInput from './TodoInput';

function TodoForm() {
    // Sparar värdet från inputfältet
    const [task, setTask] = useState("");

    // Förhindrar att sidan laddas om vid submit
    const handleSubmit = (e) => {
        // Stoppar default behavior
        e.preventDefault();

        if (!task.trim()) return;
    };

    return (
        <div>
            <form id="todoForm" onSubmit={handleSubmit}>
            {/* Skickar task och setTask till TodoInput via props */}
            <TodoInput task={task} setTask={setTask} />
            </form>
        </div>
    );
}

export default TodoForm;   