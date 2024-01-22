const DeleteButton = (props) => {
    return (<>
    <form onSubmit={props.function}>
        <button type='submit'>delete</button>
    </form>
    </>)
}

export default DeleteButton