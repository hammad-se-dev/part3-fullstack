import express from 'express'
import personsData from './person.json' with { type: 'json' }

let persons = [...personsData]   // use let instead of const

const app = express()

const PORT = 3001

app.use(express.json())


// exercise 3.1
app.get('/api/persons', (req, res) => {
  res.send(persons)
})

// exercise 3.2

//exercise 3.3
app.get('/api/persons/:id', (req,res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  res.send(person)
})

//exercise 3.4
app.delete('/api/persons/:id', (req,res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

//exercise 3.5
app.post('/api/persons', (req,res) => {
  const body = req.body
  if (body.name && body.number){
    if (persons.find(person => person.name === body.name)){
      res.status(400).json({error:'name must be unique'});
    } else {
      const person = {
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number
      }
      persons = persons.concat(person)
      res.status(201).json({
        message: "contact added successfully",
        person: person
      })
    }
    
  }
  else {
    res.status(400).json({error: "name or number is missing"})
  }
})


app.listen(PORT, () => {
  console.log("Server running on port", PORT)
})


