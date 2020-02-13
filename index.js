// Step 1 - Imports
const express = require("express")
const postsRouter = require("./routes/post-router.js")
const server = express()

// Step 2 - Teach express how to read JSON from the body
server.use(express.json()) // Needed for POST and PUT/PATCH

server.use("/api/posts", postsRouter)
// server.use("/", (req, res) => {
//   res.send("Success")
// })

// Step 3 - Set up port to listen
const port = 5000
server.listen(port, () => console.log(`\n** API on port ${port} \n`))
