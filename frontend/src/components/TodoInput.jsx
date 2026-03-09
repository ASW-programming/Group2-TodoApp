// Tar emot task och setTask från TodoForm via props
function TodoInput(props) {
    return (
        <input
            type="text"
            value= {props.task}
            //setTask uppdaterar state
            onChange={(e) => props.setTask(e.target.value)}
        />
    );
}

export default TodoInput;
