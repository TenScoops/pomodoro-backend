const express = require('express')
const activityController = require('../controllers/activityController')

const router = express.Router()


router.get('/:user_id', activityController.getActivities)

router.post('/', activityController.addActivity)


module.exports = router;