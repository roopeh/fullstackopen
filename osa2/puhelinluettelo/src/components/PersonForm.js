const PersonForm = ({ name, number, nameChangeFunction, numberChangeFunction, submitFunction }) => {
    return (
        <div>
            <form onSubmit={submitFunction}>
                <div>name: <input value={name} onChange={nameChangeFunction} /></div>
                <div>number: <input value={number} onChange={numberChangeFunction} /></div>
                <div><button type="submit">add</button></div>
            </form>
        </div>
    )
}

export default PersonForm
