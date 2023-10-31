const Persons = ({ persons, searchTerm, onClickF }) => {
  return (
    <>
      {persons
        .filter((item) => {
          return (
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.number.toLowerCase().includes(searchTerm.toLowerCase())
          )
        })
        .map((item) => (
          <div key={item.name}>
            <p>
              {item.name} {item.number}
            </p>
            <button onClick={() => onClickF(item)}>delete</button>
          </div>
        ))}
    </>
  )
}

export default Persons
