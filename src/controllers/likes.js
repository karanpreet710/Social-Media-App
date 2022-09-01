const { Likes } = require('../db/models')

async function createNewLike(userId,postId) {
    const like = await Likes.create({
      userId,
      postId
    })
  
    return like
}

async function findAllLikes(query) {
  // TODO: Handle query params
  let where={}
  if(query.postId)
  {
    where.postId=query.postId
  }
  if(query.userId)
  {
    where.userId=query.userId
  }
  const posts = await Likes.findAll({
    where
  })

  return posts
}

module.exports = {
  createNewLike,
  findAllLikes
}


// async function task() {
//   console.log(
//     await createNewLike(
//       1,
//       1
//     )
//   ),
//   console.log(
//     await createNewLike(
//       2,
//       1
//     )
//   )
//   console.log(
//     await createNewLike(
//       3,
//       1
//     )
//   )
//   console.log(
//     await createNewLike(
//       1,
//       2
//     )
//   )
// }

// task()