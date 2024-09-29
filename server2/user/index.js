const express = require('express')

const PORT = 8000

const app = express()

app.get('/', (req, res) => res.json({ msg: 'hey from my own server' }));

app.get('/home', (req,res) => {
    res.json({
        ans : 'My Home Page .asd'
    })
})


app.listen(PORT, () => console.log(`Serer Strted on port ${PORT}`))


















                                    
