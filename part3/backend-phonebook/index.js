const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body) // Mostrar los datos de la solicitud POST
    ].join(' ');
  })
);



   let persons = [
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]

    
    app.get('/info',(request, response) =>{
    const currentTime = new Date().toISOString();
    response.send(`Phonebook has info for ${persons.length} people.\n Request received at ${currentTime}.`)
  })

    app.get('/api/persons',(request, response) =>{
        response.json(persons)
    })
    
    app.get('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        const person = persons.find(person => person.id === id)
        
        if (person) {
          response.json(person)
        } else {
          response.status(404).end()
        }
      })

      app.delete('/api/persons/:id', (request, response) => {
        const id = Number(request.params.id)
        persons = persons.filter(person => person.id !== id)
      
        response.status(204).end()
      })
      
      const generateId = () => {
        const maxId = persons.length > 0
          ? Math.max(...persons.map(n => n.id))
          : 0
        return maxId + 1
      }
   
      const nameExists = (name) => {
        return persons.some(person => person.name.toLowerCase() === name.toLowerCase())
      }

      app.post('/api/persons', (request, response) => {
       const body = request.body

       
       
       if (!body.name) {
            return response.status(400).json({ 
              error: 'has not added the name' 
            })
        }
       if (!body.number) {
            return response.status(400).json({ 
              error: 'has not added phone number' 
            })
        }

        const name = body.name.trim()

        if (nameExists(name)) {
          return response.status(400).json({ 
            error: 'Name already exists in the phonebook' 
          })
        }
        
        const newPerson = {
            name: body.name,
            number: body.number,
            id: generateId(),
        }
        
        persons = persons.concat(newPerson)

        response.json(newPerson)
    }) 

    const PORT = 3001
    app.listen(PORT, () =>{
        console.log(`Server running on port ${PORT}`)
    })
  