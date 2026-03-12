function Btn(props) {
	return (
		<div>
			<button
				className="btn"
				onClick={props.onClick}
				type={props.type}
				id={props.id}>
				{props.svg}
				<span className="btnText">{props.text}</span>
			</button>
		</div>
	);
}

export default Btn;
