import phoneService from './../services/phone'

const deleteEntry = (event, id, name) => {
    event.preventDefault()
    const msg = `Delete ${name}?`
    const conf = window.confirm(msg)
    console.log('confirm? ', conf)

    if (conf === true) {
        console.log("proceeding deletion of " + id + "....");
        phoneService.deletePerson(id)
            .then((i) => { 
                console.log("Success ", i) 
            })
            .catch(
                err => {
                    console.log("fail ", err)
                }
            )
    }

}


const Number = ({ id, name, number }) => {
    return (<div key={id}>
        {name} {number}
        <form onSubmit={() => {
            deleteEntry(event, id, name)
        }}>
            <button type='submit'>delete</button>
        </form>

    </div>)
}

const Numbers = ({ persons }) => {

    return (
        persons.map(pb => {
            return (
                <Number key={pb.id} name={pb.name} id={pb.id} number={pb.number} />
            )
        }))
}

export default Numbers