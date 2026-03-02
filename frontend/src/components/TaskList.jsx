import React from "react";

function TaskList() {
	const numbers = [1, 2, 3, 4];
	return (
		<div>
			<ul>
				{numbers.map((number) => (
					<li>{numbers}</li>
				))}
			</ul>
		</div>
	);
}

export default TaskList;
