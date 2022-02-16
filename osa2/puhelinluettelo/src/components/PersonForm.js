const PersonForm = ({ name, number, nameChangeFunction, numberChangeFunction, submitFunction }) => {
    return (
        <div>
            <form onSubmit={submitFunction}>
                <table>
                    <tbody>
                        <tr><td>name:</td><td><input value={name} onChange={nameChangeFunction} /></td></tr>
                        <tr><td>number:</td><td><input value={number} onChange={numberChangeFunction} /></td></tr>
                        <tr><td></td><td><button type="submit">add</button></td></tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default PersonForm
