const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const helmet = require('helmet')
const multer = require('multer')
const path = require('path')
const cors = require('cors')

const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')
const userRoute = require('./routes/user')

const app = express()
app.use(cors())

//mongodb connection
mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/carstore', { //dont use 'localhost' use '127.0.0.1'
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected to MongoDB')
    }
})

app.use('/images', express.static(path.join(__dirname, 'public/images')))

//middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File Uploaded Successfully')
    } catch (err) {
        console.log(err)
    }
})

app.use('/auth', authRoute)
app.use('/posts', postsRoute)
app.use('/user', userRoute)

app.listen('4000', () => {
    console.log('Listening on port 4000')
})