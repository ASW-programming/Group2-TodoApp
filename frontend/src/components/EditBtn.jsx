function EditBtn(props) {
	const handleStartEdit = () => {
		props.onStartEdit(props.id, props.currentTitle);
	};

	return (
		<button className="btn" onClick={handleStartEdit}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="25"
				viewBox="0 0 24 24"
				fill="none"
				stroke="#fff"
				strokeWidth="1"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="lucide lucide-pencil-icon lucide-pencil">
				<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
				<path d="m15 5 4 4" />
			</svg>
			<span className="btnText">Edit</span>
		</button>
	);
}

export default EditBtn;
