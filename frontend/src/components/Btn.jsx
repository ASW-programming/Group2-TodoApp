import { Delete } from "../utils/Delete";

function Btn(props) {
	return (
		<div>
			<button className="btn" onClick={props.onClick}>
				{props.svg}
				<span className="btnText">{props.text}</span>
				{props.btnText}
			</button>
		</div>
	);
}

export default Btn;
