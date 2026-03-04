function TodoItem({ todo }) {
    return (
        <li>
            {/* Visa text om den finns */}
            {todo?.text}
        </li>
    );
}

export default TodoItem;