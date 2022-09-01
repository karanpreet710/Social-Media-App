const { Router } = require('express')
const {
  findAllPosts,
  createNewPost
} = require('../../controllers/posts')
const {
  createNewLike,
  findAllLikes
} = require('../../controllers/likes')

const {
  createNewComment,
  findAllComments
} = require('../../controllers/comments')

const route = Router()

route.get('/', async (req, res) => {
  const posts = await findAllPosts(req.query)
  res.status(200).send(posts)
})

route.post('/', async (req, res) => {
  const { userId, title, body } = req.body
  
  if ((!userId) || (!title) || (!body)) {
    return res.status(400).send({
      error: 'Need userid, title and body to create post'
    })
  }

  const post = await createNewPost(userId, title, body)
  res.status(201).send(post)
})

route.get('/likes',async (req, res) => {
  const likes = await findAllLikes(req.query)
  res.status(200).send(likes)
})

route.post('/likes',async (req, res) => {
  const { pid,uid} = req.body
  if (!(pid) || (!uid)) {
    return res.status(400).send({
      error: 'Need postId and userId to create like'
    })
  }

  const like = await createNewLike(uid,pid)
  res.status(201).send(like)
})

route.get('/comments',async (req, res) => {
  const comments = await findAllComments(req.query)
  res.status(200).send(comments)
})

route.post('/comments',async (req, res) => {
  console.log("hell")
  const { body,pid,uid} = req.body
  if (!(body) || !(pid) || (!uid)) {
    return res.status(400).send({
      error: 'Need body, postId and userId to create comment'
    })
  }

  const comment = await createNewComment(body,uid,pid)
  res.status(201).send(comment)
})

module.exports = {
  postsRoute: route
}