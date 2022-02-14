import Person from './Person'

const Persons = ({ personList, removeFunction }) => personList.map(person => <Person key={person.name} person={person} removeFunction={removeFunction} />)

export default Persons
