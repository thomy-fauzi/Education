const express = require('express')
const app = express()
const port = 3000
const session = require("express-session");
const router = require("./routers/index")
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.use(session({
    secret: "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})