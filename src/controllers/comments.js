const { Comments,Users } = require('../db/models')

async function createNewComment(body,userId,postId) {
    const comment = await Comments.create({
      body,
      userId,
      postId
    })
  
    return comment
}

async function findAllComments(query) {
  // TODO: Handle query params
  let where={}
  if(query.postId)
  {
    where.postId=query.postId
  }
  const comments = await Comments.findAll({
    include:[Users],
    where
  })

  return comments
}

module.exports = {
  createNewComment,
  findAllComments
}


// async function task() {
//   console.log(
//     await createNewComment(
//       "Wow nice info",
//       2,
//       1
//     )
//   ),
//   console.log(
//     await createNewComment(
//       "Great",
//       3,
//       1
//     )
//   )
//   console.log(
//     await createNewComment(
//       "Awesome",
//       3,
//       2
//     )
//   )
//   console.log(
//     await createNewComment(
//       "Well that's some Wiki Stuff!!",
//       1,
//       2
//     )
//   )
// }

// task()