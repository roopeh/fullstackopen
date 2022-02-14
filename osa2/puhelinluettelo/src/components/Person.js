const Person = ({ person, removeFunction }) => <div>{person.name} {person.number} <button onClick={() => removeFunction(person.id, person.name)}>delete</button><br /></div>

export default Person
