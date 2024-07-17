const express = require('express')
const activityController = require('../controllers/activityController')

const router = express.Router()


router.get('/getActivities/:user_id', activityController.getActivities)

router.post('/addActivity', activityController.addActivity)


module.exports = router;