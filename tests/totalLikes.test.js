const listHelper = require('../utils/list_helper')

describe('totalLikes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    
      test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
      })

    const listWithMoreBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 55,
            __v: 0
        },
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
          }
      ]
    
      test('when list has more blogs, equals the sum of likes of each blog', () => {
        const result = listHelper.totalLikes(listWithMoreBlogs)
        expect(result).toBe(67)
      })
  
  })

  describe('mostLikes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go to Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        }
      ]
    
      test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        const fave = {
            title: "Go to Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            likes: 5
        }
        expect(result).toEqual(fave)
      })

    const listWithMoreBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go to Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Hello there',
            author: 'Jhonny Cash',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 60,
            __v: 0
        },
        {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
          }
      ]
    
      test('when list has more blogs, equals the one with most Likes', () => {
        const result = listHelper.favoriteBlog(listWithMoreBlogs)
        const fave = {
            title: "Hello there",
            author: "Jhonny Cash",
            likes: 60
        }
        expect(result).toEqual(fave)
      })
  })