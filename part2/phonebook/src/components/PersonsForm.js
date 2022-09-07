const PersonsForm = ({
  submit,
  name,
  phoneNumber,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <>
      <form onSubmit={submit}>
        <div>
          name:
          <input type='text' value={name} onChange={onNameChange} />
        </div>

        <div>
          number:
          <input
            type='tel'
            name='phone'
            placeholder='040-5323523, 02-1234556'
            value={phoneNumber}
            onChange={onNumberChange}
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </>
  )
}

export default PersonsForm
