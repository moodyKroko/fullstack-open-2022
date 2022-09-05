const express = require('express')
const logger = require('morgan')
const app = express()
const cors = require('cors')

require('dotenv').config()
const Person = require('./models/person')

app.use(express.json())

logger.token('person', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(
  logger(':method :url :status :res[content-length] - :response-time ms :person')
)

app.use(cors())

app.use(express.static('build'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

const getTotalDocCount = async () => {
  const count = await Person.countDocuments()
  return count
}

app.get('/info', (request, response) => {
  getTotalDocCount().then((count) => {
    response.send(`Phonebook has info for ${count} people\n${new Date()}`)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person)
    })
    .catch((error) => {
      response.status(404).end()
    })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  const returnErrResponse = (statusCode, message) => {
    return response.status(statusCode).json({
      error: message,
    })
  }

  if (!body.name) {
    returnErrResponse(400, 'name missing')
  } else if (!body.number) {
    returnErrResponse(400, 'number missing')
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((savedPerson) => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(200).end()
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
