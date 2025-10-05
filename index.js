import express from 'express'
import personsData from './person.json' with { type: 'json' }
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

let persons = [...personsData]

const app = express()

app.use(express.json())
app.use(cors())  // Enable CORS

// exercise 3.1
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// exercise 3.3
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  
  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: 'Person not found' })
  }
})

// exercise 3.4
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

// exercise 3.5
app.post('/api/persons', (req, res) => {
  const body = req.body
  
  if (body.name && body.number) {
    if (persons.find(person => person.name === body.name)) {
      res.status(400).json({ error: 'name must be unique' })
    } else {
      const person = {
        name: body.name,
        id: Math.floor(Math.random() * 1000).toString(),
        number: body.number
      }
      persons = persons.concat(person)
      res.status(201).json({
        message: "contact added successfully",
        person: person
      })
    }
  } else {
    res.status(400).json({ error: "name or number is missing" })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})