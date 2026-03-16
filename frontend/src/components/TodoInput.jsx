// Tar emot task och setTask från TodoForm via props
function TodoInput(props) {
    return (
        <div className="inputContainer">
            <input
                type="text"
                id="inputField"
                className="todoInput"
                value={props.task}
                onChange={(e) => props.setTask(e.target.value)}
                placeholder="I need to..."
            />

            <span className="inputHighlight"></span>
        </div>
    );
}
export default TodoInput;
