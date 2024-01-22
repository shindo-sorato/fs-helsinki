const Header = (props) => <h1>{props.name}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = (props) => {
    console.log("goint to Part")
    const part = props.part
    console.log("props part : ", part)
    return (
        <div>
            {part.name} {part.exercises}
        </div>)
}

const Display = (props) => {
    if (props.bold === true) {
        return <p><b>{props.text}</b></p>
    }

    return <p>{props.text}</p>
}

const TotalEx = ({ parts }) => {
    const sum = parts.reduce(
        (acc, curval) => {
            return acc + curval.exercises
        }, 0
    )
    return (
        <>
            <Display bold={true} text={"total of " + sum + " exercises"} />
        </>
    )
}

const Course = (props) => {

    const courses = props.courses

    return (<>

        <Header name='Web development curriculum' />
        {
            courses.map(

                cs => {

                    return <div key={cs.id}>

                        <h2 key={cs.id}>{cs.name}</h2>

                        {
                            cs.parts.map(
                                pt => {
                                    return <div key={pt.id}>
                                        <Part part={pt} />
                                    </div>
                                })
                        }
                        <TotalEx parts={cs.parts}/>


                    </div>



                }
            )
        }</>)


}


export default Course