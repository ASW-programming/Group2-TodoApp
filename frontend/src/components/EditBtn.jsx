function EditBtn(props) {
  
    const api_url = "http://localhost:3000";

    async function editTodo(id) {
        console.log('Editing', id);
    }

    return (
        <button onClick={() => editTodo(props.id)}>
        Edit
        </button>
    );
}

export default EditBtn;