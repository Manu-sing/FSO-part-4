const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const blogs = await helper.blogsInDb()
  
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
  
test('the first blog contains the right title', async () => {
    const blogs = await helper.blogsInDb()
  
    expect(blogs[0].title).toBe(helper.initialBlogs[0].title)
  })

test('a specific blog is within the returned notes', async () => {
    const blogs = await helper.blogsInDb()
  
    const contents = blogs.map(r => r.title)
    expect(contents).toContain(
      'Go To Statement Considered Harmful'
    )
  })

test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Testing if the adding of a new blog works well',
      author: 'Manu',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#test-environment',
      likes: 44,
      status: 'Read'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtTheEnd = await helper.blogsInDb()
    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtTheEnd.map(r => r.title)
    expect(contents).toContain(
      'Testing if the adding of a new blog works well'
    )
  })

test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Manu',
      url: 'https://fullstackopen.com/en/part4/testing_the_backend#test-environment',
      likes: 44,
      status: 'Read'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtTheEnd = await helper.blogsInDb();
    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length)

  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
  
    const blogToView = blogsAtStart[0]
  
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
    expect(resultBlog.body).toEqual(processedBlogToView)
  })
  
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  
    const contents = blogsAtEnd.map(r => r.title)
  
    expect(contents).not.toContain(blogToDelete.title)
  })

test('the id property exists', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs[0].id).toBeDefined()

})


test('it is possible to change the status of a blog', async () => {
  const blogs = await helper.blogsInDb()
  const blogToToggle = await blogs[0]
  const updatedBlog = await blogToToggle.status === "Read" ? {...blogToToggle, status: "Non Read"} : {...blogToToggle}

  await api
    .put(`/api/blogs/${updatedBlog.id}`)
    .send(updatedBlog)

  const blogsAtTheEnd = await helper.blogsInDb()
  expect(blogsAtTheEnd[0].status).toBe("Non Read")


})

test('when the likes property, is missing, it will be set to a default value of 0', async () => {
  const blogs = await helper.blogsInDb()
  const blogWithoutLikes = await blogs.find(blog => !blog.likes)
  const updatedBlog = await {...blogWithoutLikes, likes: 0}

    await api
    .delete(`/api/blogs/${blogWithoutLikes.id}`)

    await api
    .post('/api/blogs')
    .send(updatedBlog)

    const blogsAtTheEnd = await helper.blogsInDb();
    expect(blogsAtTheEnd.length).toBe(3)
    expect(blogsAtTheEnd[2].likes).toBeDefined()
    expect(blogsAtTheEnd[2].likes).toBe(0)


  
})



afterAll(() => {
  mongoose.connection.close()
})