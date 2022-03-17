const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      status: "Read"
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      status: "Non Read"
    },
    {
        title: "The likes property is missing",
        author: "Emanuele Guarnaccia",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        status: "Read"
    },
  ]

const nonExistingId = async () => {
  const blog= new Blog(
      { 
        title: 'This blog does not exist', 
        author: 'Nobody',
        url: 'https://fullstackopen.com/en/part4/testing_the_backend#test-environment',
        likes: 1,
        status: "Non Read"
    })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}