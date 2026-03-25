function TodoInput(props) {
	return (
		<div className="inputContainer">
			<input
				type={props.type}
				id="inputField"
				className={props.className}
				onChange={props.onChange}
				placeholder={props.placeholder}
				{...(props.type === "checkbox"
					? { checked: props.checked }
					: { value: props.value })}
			/>
		</div>
	);
}
export default TodoInput;
