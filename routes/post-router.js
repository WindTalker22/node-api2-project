const express = require("express")

const data = require("../data/db")

const router = express.Router()

router.get("/", (req, res) => {
  data
    .find()
    .then(posts => res.status(200).json(posts))
    .catch(error =>
      res
        .status(500)
        .json({ errorMessage: "The post information could not be retrieved" })
    )
})

router.get("/:id", (req, res) => {
  const { id } = req.params

  data
    .findById(id)
    .then(posts =>
      posts.length === 0
        ? res.status(404).json({
            message: "The post with the specified id does not exist"
          }) & console.log(posts)
        : res.status(200).json(posts)
    )
    .catch(error =>
      res
        .status(500)
        .json({ errorMessage: "The post information could not be retrieved" })
    )
})

router.get("/:id/comments", (req, res) => {
  const { id } = req.params

  data
    .findCommentById(id)
    .then(posts =>
      posts.length === 0
        ? res.status(404).json({
            message: "The post with the specified id does not exist"
          }) & console.log(posts)
        : res.status(200).json(posts)
    )
    .catch(error =>
      res
        .status(500)
        .json({ errorMessage: "The post information could not be retrieved" })
    )
})

// router.post("/", (req, res) => {
//   const { title, contents } = req.body
//   data
//     .insert(req.body)
//     .then(posts =>
//       !posts.title || !posts.content
//         ? res.status(400).json({
//             errorMessage: "Please provide title and contents for the post"
//           })
//         : res.status(201).json(posts)
//     )
//     .catch(error => {
//       console.log(error)
//       res.status(500).json({
//         errorMessage: "There was an error while saving the post to the database"
//       })
//     })
// })
router.post("/", (req, res) => {
  const { title, contents } = req.body
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  } else {
    data
      .insert(req.body)
      .then(post => {
        res.status(201).json(post)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      })
  }
})
module.exports = router
