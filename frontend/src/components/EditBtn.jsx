function EditBtn(props) {

    const handleStartEdit = () => {
        props.onStartEdit(props.id, props.currentTitle);
    };

    return (
        <button onClick={handleStartEdit}>
        Edit
        </button>
    );
}

export default EditBtn;