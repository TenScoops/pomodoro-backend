const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

//get user profile
router.get('/:id', userController.getUserProfile)

//update user profile
router.put('/:id', userController.updateUserProfile)

//delete user account
router.delete('/:id', userController.deleteUser)