const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

//get user profile
router.get('/:user_id', userController.getUserProfile)

//update user profile
router.put('/:user_id', userController.updateUserProfile)

//delete user account
router.delete('/:user_id', userController.deleteUser)

module.exports = router;