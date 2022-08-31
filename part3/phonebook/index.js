const { application } = require('express')
const express = require('express')
const logger = require('morgan')
const app = express()

const PORT = 3001

app.use(express.json())
app.use(logger('tiny'))

app.listen(PORT)

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

logger.token('req', (request, response) => {})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people
  ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)

  if (person) {
    return response.json(person)
  }

  response.status(404).end()
})

const generateID = () => {
  const maxId = persons.length > 0 ? Math.floor(Math.random() * 500) : 0
  return maxId
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    })
  } else if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    })
  }

  const existing = persons.find((person) => person.name === body.name)

  if (existing) {
    return response.status(409).json({
      error: 'name must be unique',
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  }

  persons = persons.concat(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter((person) => person.id !== id)

  response.status(200).end()
})
