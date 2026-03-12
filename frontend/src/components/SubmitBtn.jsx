import PostSVG from "../assets/PostSVG";

function SubmitBtn() {
	return (
		<>
			<button className="btn" id="submitBtn" type="submit">
				<PostSVG />
				<span className="btnText">Submit</span>
			</button>
		</>
	);
}

export default SubmitBtn;
