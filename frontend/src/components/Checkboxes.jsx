function TodoCheckbox(props) {
	return (
		<input
			type="checkbox"
			className="todoCheckbox"
			checked={props.checked}
			onChange={props.onChange}
		/>
	);
}

export default TodoCheckbox;
