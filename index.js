const express = require('express')
const app = express()
const morgan = require('morgan')
morgan.token('body', (request) => JSON.stringify(request.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let blogs = [
    {
        id: 1,
        title: "Alexis Ohanian on his plan to back more emerging managers",
        author: "Connie Loizos",
        url: "https://techcrunch.com/2022/03/13/alexis-ohanian-on-his-plan-to-back-more-emerging-managers/",
        likes: 55,
        status: "Read"
      },
      {
        id: 2,
        title: "Augmented reality’s half-decade of stagnation",
        author: "Lucas Matney",
        url: "https://techcrunch.com/2022/03/13/augmented-realitys-half-decade-of-stagnation/",
        likes: 53,
        status: "Non Read"
      },
      {
        id: 3,
        title: "Founders: Connect with influential movers and shippers at TC Sessions: Mobility 2022",
        author: "Alexandra Ames",
        url: "https://techcrunch.com/2022/03/13/founders-connect-with-influential-movers-and-shippers-at-tc-sessions-mobility-2022/",
        likes: 54,
        status: "Read"
      },
      {
        id: 5,
        title: "Tiger’s stamp of approval is coming for the early stage",
        author: "Natasha Mascarenhas",
        url: "https://techcrunch.com/2022/03/12/tiger-global-early-stage/",
        likes: "45",
        status: "Read"
      }
]
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/blogs', (request, response) => {
    response.json(blogs)
})

app.get('/api/blogs/:id', (request, response) => {
    const id = Number(request.params.id)
    const blog = blogs.find(blog => blog.id === id)
    if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
  })

app.delete('/api/blogs/:id', (request, response) => {
    const id = Number(request.params.id)
    blogs = blogs.filter(blog => blog.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = blogs.length > 0
      ? Math.max(...blogs.map(n => n.id))
      : 0
    return maxId + 1
  }
  
app.post('/api/blogs', (request, response) => {
    const body = request.body
  
    if (!body.title || !body.author || !body.url) {
      return response.status(400).json({ 
        error: "The fields 'title', 'author' and 'url' must be provided" 
      })
    }
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      status: body.status,
      id: generateId(),
    }
  
    blogs = blogs.concat(blog)
  
    response.json(blog)
  })

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})