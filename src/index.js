const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const jwt = require('jsonwebtoken')
const app = express()
const port = process.env.PORT

// app.use((req, res, next) => {
//     if(req){
//         res.status(504).send('Server under maintanance')
//     }
// })

app.use(userRouter)
app.use(taskRouter)
app.use(express.json())


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
