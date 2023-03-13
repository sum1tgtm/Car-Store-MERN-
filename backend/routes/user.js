const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

//get a user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

//update a user
router.put('/:id/update', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (err) {
                res.status(500).json(err)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json('Account Updated Successfully')
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('Not Authorized to Update')
    }
})

// wishlist a car
router.put('/:id/wishlist', async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
            const user = await User.findById(req.params.id)
            if (user.wishlist.includes(req.body.carId)) {
                await user.updateOne({
                    $pull: {
                        wishlist: req.body.carId
                    }
                })
                res.status(200).json('Car Removed from Wishlist')
            } else {
                await user.updateOne({
                    $push: {
                        wishlist: req.body.carId
                    }
                })
                res.status(200).json('Car Added to Wishlist')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('Cant Wishlist You Own Car')
    }
})

// router.put('/:id/wishlist', async (req, res) => {
//     if (req.params.id !== req.body.userId) {
//         try {
//             const user = await User.findById(req.params.id)

//             // Check if wishlist is an array of arrays
//             const wishlist = user.wishlist.flat()

//             if (wishlist.includes(req.body.carId)) {
//                 await user.updateOne({
//                     $pull: {
//                         wishlist: req.body.carId
//                     }
//                 })
//                 res.status(200).json('Car Removed from Wishlist')
//             } else {
//                 await user.updateOne({
//                     $push: {
//                         wishlist: req.body.carId
//                     }
//                 })
//                 res.status(200).json('Car Added to Wishlist')
//             }
//         } catch (err) {
//             res.status(500).json(err)
//         }
//     } else {
//         res.status(403).json('Cant Wishlist You Own Car')
//     }
// })


module.exports = router