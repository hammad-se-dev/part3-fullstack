import express, { json } from 'express'

const app = express()

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

// this pure Node.js server code is commented out and replaced with Express.js code below it

// const app = http.createServer((req,res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'})
//     res.end(JSON.stringify(notes))
// })


app.get('/', (req,res) => {
    res.send('hello world')
})

app.get('/api/notes/', (req, res) => {
    res.json(notes);
});

app.get('/api/notes/:id', (req,res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id === id)
    if (note) res.json(note)
    else res.status(404).end()
})

app.get('/api/notes/important/:important', (req,res) => {
    // const isImportant = req.params.important === 'true'
    const important = req.params.important === 'true' 
    const filtered = notes.filter(note => note.important === important)
    res.json(filtered)
    
})

app.delete('/api/notes/:id', (req,res) => {
  const id = req.params.id
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
} )

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})