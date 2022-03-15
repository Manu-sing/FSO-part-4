const express = require('express')
const app = express()

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

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})