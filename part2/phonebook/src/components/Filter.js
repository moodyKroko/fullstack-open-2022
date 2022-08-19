const Filter = ({ filter, onSearch }) => {
  return (
    <>
      filter shown with
      <input type='search' value={filter} onChange={onSearch} />
    </>
  )
}

export default Filter
