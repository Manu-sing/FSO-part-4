const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
  
blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
      response.json(blogs)
    })
  })

blogsRouter.get('/:id', (request, response, next) => {
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

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

blogsRouter.post('/', (request, response) => {
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

blogsRouter.put('/:id', (request, response, next) => {
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

module.exports = blogsRouter