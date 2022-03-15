require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
morgan.token('body', (request) => JSON.stringify(request.body))
const Blog = require('./models/blog')


app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))


// let blogs = [
//     {
//         id: 1,
//         title: "Alexis Ohanian on his plan to back more emerging managers",
//         author: "Connie Loizos",
//         url: "https://techcrunch.com/2022/03/13/alexis-ohanian-on-his-plan-to-back-more-emerging-managers/",
//         likes: 55,
//         status: "Read"
//       },
//       {
//         id: 2,
//         title: "Augmented reality’s half-decade of stagnation",
//         author: "Lucas Matney",
//         url: "https://techcrunch.com/2022/03/13/augmented-realitys-half-decade-of-stagnation/",
//         likes: 53,
//         status: "Non Read"
//       },
//       {
//         id: 3,
//         title: "Founders: Connect with influential movers and shippers at TC Sessions: Mobility 2022",
//         author: "Alexandra Ames",
//         url: "https://techcrunch.com/2022/03/13/founders-connect-with-influential-movers-and-shippers-at-tc-sessions-mobility-2022/",
//         likes: 54,
//         status: "Read"
//       },
//       {
//         id: 5,
//         title: "Tiger’s stamp of approval is coming for the early stage",
//         author: "Natasha Mascarenhas",
//         url: "https://techcrunch.com/2022/03/12/tiger-global-early-stage/",
//         likes: "45",
//         status: "Read"
//       }
// ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/blogs', (request, response) => {
    Blog.find({}).then(blogs => {
      response.json(blogs)
    })
  })

app.get('/api/blogs/:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
  })

app.delete('/api/blogs/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

app.post('/api/blogs', (request, response) => {
    const body = request.body
  
    if (!body.title || !body.author || !body.url) {
      return response.status(400).json({ error: "The fields 'title', 'author' and 'link' must be provided" })
    }
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      status: body.status
    })
  
    blog.save().then(savedBlog => {
      response.json(savedBlog)
    })
  })

app.put('/api/blogs/:id', (request, response, next) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      status: body.status
    }
  
    Blog.findByIdAndUpdate(request.params.id, blog, { new: body.status })
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
      .catch(error => next(error))
  })

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })