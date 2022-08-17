const Filter = ({ searchName, onNameSearch }) => {
  return (
    <>
      filter shown with
      <input type='search' value={searchName} onChange={onNameSearch} />
    </>
  )
}

export default Filter
