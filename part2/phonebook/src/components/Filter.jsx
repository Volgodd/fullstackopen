const Filter = ({searchTerm, setSearchTerm}) => {

  return (    
    <>
      <p>filter shown with</p>
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    </>)
}

export default Filter