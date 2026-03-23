// Tar emot task och setTask från TodoForm via props
function TodoInput(props) {
	return (
		<div className="inputContainer">
			<input
				type={props.type}
				id="inputField"
				className={props.className}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
				checked={props.checked}
			/>
		</div>
	);
}
export default TodoInput;
