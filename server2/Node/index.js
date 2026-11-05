// How to check request 
// For GET : curl https://codev-omega.vercel.app/ & node index.js
// For POST: curl -X POST https://codev-omega.vercel.app/ -d "key=value" & node index.js
// For PUT: curl -X PUT https://codev-omega.vercel.app/ -d "key=value" & node index.js
// For DELETE: curl -X DELETE https://codev-omega.vercel.app/ & node index.js

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})