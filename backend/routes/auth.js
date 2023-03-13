const   router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
        })

        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).json('User Not Found')
        } else {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) {
                res.status(400).json('Wrong Credentials')
            } else {
                res.status(200).json(user)
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router