const Field = (props) => {
    return (<div>
        {props.text} <input value={props.value} onChange={props.onChange} />
    </div>)
}

const Add = ({text1, value1, func1, text2, value2, func2, submitfunc}) => {

    return (
        <>
            <form onSubmit={submitfunc}>
                <div>
                <Field text={text1} value={value1} onChange={func1} />
                </div>
                <Field text={text2} value={value2} onChange={func2} />
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )

}

export default Add