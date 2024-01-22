const Notification = ({msg, category='green'}) => {
    if (msg === null){
        return null
    }

    if (category === 'red'){
        return (
            <div className='redMsg'>
                {msg}
            </div>
        )
    }

    return (
        <div className='greenMsg'>
            {msg}
        </div>
    )

}

export default Notification