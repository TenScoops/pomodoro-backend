const db = require('../db/database') // ..db/database


//add a new activity
const addActivity = async(req, res) =>{
    try{
        const { user_Id, rating, time_worked, date } = req.body;
        console.log('Received values:', { user_Id, rating, time_worked, date });

        const [result] = await db.execute(
            'INSERT INTO activity (user_Id, rating, time_worked, date) VALUES (?, ?, ?, ?)',
            [user_Id, rating, time_worked, date]
        );
        if(result.affectedRows > 0) {
            res.status(201).send('Activity added successfully')
        }else {
            res.status(400).send('Failed to add activity')
        }
    }catch(err){
        res.status(500).send(err.message)
    }
}

// Fetch activities for a user
const getActivities = async (req, res) => {
    try {
        const {user_Id} = req.params
        const [rows] = await db.execute('SELECT * FROM activity WHERE user_Id = ?', [user_Id]);
        res.status(201).json(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    addActivity,
    getActivities
}