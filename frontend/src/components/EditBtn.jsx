function EditBtn(props) {

    const handleStartEdit = () => {
        props.onStartEdit(props.id, props.currentTitle);
    };
    /*
    const api_url = "http://localhost:3000";

    
    async function editTodo(id) {
        try {
            const response = await fetch(`${api_url}/updateTodos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: "TEST EDIT", // hårdkodar först för att se om det funkar
                }),
            });
        
        if (!response.ok) {
            throw new Error("Failed to update todo");
        }
    } catch (error) {
        console.log(error);
    }
}

    // 2. Handler kopplad till knappen
    const handleEdit = async () => {
        await editTodo(props.id);
        props.onEdit(); // samma mönster som onDelete
    };
    */

    return (
        <button onClick={handleStartEdit}>
        Edit
        </button>
    );
}

export default EditBtn;