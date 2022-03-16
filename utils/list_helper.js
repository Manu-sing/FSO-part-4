const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)

    return totalLikes
}

const favoriteBlog = (blogs) => {
    const maxLikes = blogs.reduce((a, b) => a.likes > b.likes ? a : b);
    
    const favoriteBlog = {
        title: maxLikes.title,
        author: maxLikes.author,
        likes: maxLikes.likes
    }

    return favoriteBlog
    
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }