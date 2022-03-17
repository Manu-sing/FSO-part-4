const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
  
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })

blogsRouter.get('/:id', async (request, response, next) => {
    
      const blog = await Blog.findById(request.params.id)
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
  })

blogsRouter.delete('/:id', async (request, response, next) => {
   
      const blog = await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    
  })

blogsRouter.post('/', async (request, response) => {
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
  
  
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
   
  })

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      status: body.status
    }
  
    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: body.status })
    response.json(savedBlog)
    
  })

module.exports = blogsRouter