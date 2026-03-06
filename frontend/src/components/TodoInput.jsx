// Tar emot task och setTask från TodoForm via props
function TodoInput({ task, setTask }) {
    return (
        <input
            type="text"
            value={task}
            //setTask uppdaterar state
            onChange={(e) => setTask(e.target.value)}
        />
    );
}

export default TodoInput;
