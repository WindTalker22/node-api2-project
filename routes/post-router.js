const express = require("express")

const data = require("../data/db")

const router = express.Router()

// GET request for a list of posts
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

// GET post by ID
router.get("/:id", (req, res) => {
  const { id } = req.params

  data
    .findById(id)
    .then(posts =>
      posts.length === 0
        ? res.status(404).json({
            message: "The post with the specified id does not exist",
            error: error
          }) & console.log(posts)
        : res.status(200).json(posts)
    )
    .catch(error =>
      res.status(500).json({
        message: "The post information could not be retrieved",
        error: error
      })
    )
})

// GET comments by ID
router.get("/:id/comments", (req, res) => {
  const { id } = req.params

  data
    .findCommentById(id)
    .then(posts =>
      posts.length === 0
        ? res.status(404).json({
            message: "The post with the specified id does not exist",
            error: error
          }) & console.log(posts)
        : res.status(200).json(posts)
    )
    .catch(error =>
      res.status(500).json({
        message: "The post information could not be retrieved",
        error: error
      })
    )
})
// <<<<<<<<<<<<< END OF GET REQUESTS >>>>>>>>>>>>

// <<<<<<<<<<<<< BEGINNING OF POST REQUESTS >>>>>>

// ADD post
router.post("/", (req, res) => {
  const { title, contents } = req.body
  if (!title || !contents) {
    res.status(400).json({
      message: "Please provide title and contents for the post."
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
          message: "There was an error while saving the post to the database",
          error: error
        })
      })
  }
})

// ADD comment to post
router.post("/:id/comments", (req, res) => {
  const { post_id, id } = req.params

  const commentBody = { ...req.body, post_id: id }

  if (commentBody.text !== null) {
    data
      .findById(post_id)
      .then(post => {
        if (post[0].id !== null) {
          data
            .insertComment(commentBody)
            .then(comment => {
              res.status(201).json(comment)
            })
            .catch(err => {
              res.status(500).json({
                error:
                  "There was an error while saving the comment to the database"
              })
            })
        } else {
          res
            .status(404)
            .json({ message: "The post with the specified ID does not exist" })
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." })
      })
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." })
  }
})
// <<<<<<<< END OF POSTS >>>>>>>>>>>>>>>

// <<<<<<<<<< BEGINNING OF DELETE >>>>>>>>>>>>>>>
// DELETE
router.delete("/:id", (req, res) => {
  console.log("deleting")
  data
    .findById(req.params.id)
    .then(post => {
      if (post[0].id !== null) {
        data
          .remove(req.params.id)
          .then(deleted => {
            if (deleted > 0) {
              res.status(200).json(post)
            } else {
              res.status(500).json({ error: "The post could not be removed" })
            }
          })
          .catch(err => {
            res.status(500).json({ error: "The post could not be removed" })
          })
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(404).json({ message: "Connection to server failed" })
    })
})
// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   Hubs.remove(id)
//     .then(post => {
//       if (post) {
//         res.status(200).json({ message: "The post has been deleted" });
//       } else {
//         res
//           .status(404)
//           .json({ message: "The post with the specified ID does not exist." });
//       }
//     })
//     .catch(error => {
//       console.log(error);
//       res.status(500).json({ error: "The post could not be recovered" });
//     });
// });
// <<<<<<<<< END OF DELETE >>>>>>>>>>>>

// <<<<<<<<<BEGINNING OF PUT >>>>>>>>>
// PUT REQUEST
router.put("/:id", (req, res) => {
  const post = req.body
  const { id } = req.params
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  } else {
    data
      .update(id, post)
      .then(updated => {
        if (updated) {
          res.status(200).json(updated)
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          })
        }
      })
      .catch(error => {
        console.log(error)
        res
          .status(500)
          .json({ error: "The post information could not be modified" })
      })
  }
})

module.exports = router
