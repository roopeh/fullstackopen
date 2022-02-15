const Person = ({ person, removeFunction }) => (
    <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button onClick={() => removeFunction(person.id, person.name)}>delete</button></td>
    </tr>
)

export default Person
