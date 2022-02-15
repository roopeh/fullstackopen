import Person from './Person'

const Persons = ({ personList, removeFunction }) => (
    <table className="persons">
        <tbody>
            {personList.map(person => <Person key={person.name} person={person} removeFunction={removeFunction} />)}
        </tbody>
    </table>
)

export default Persons
