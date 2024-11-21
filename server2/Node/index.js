// How to check request 
// For GET : curl http://localhost:3000/
// For POST: curl -X POST http://localhost:3000/ -d "key=value"
// For PUT: curl -X PUT http://localhost:3000/ -d "key=value"
// For DELETE: curl -X DELETE http://localhost:3000/

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})