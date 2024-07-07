const db = require('../db')// db/database

const getUserProfile = async (req, res) => {
    try{
        const [rows] = await db.execute('SELECT * FROM users WHERE user_id = ?', [req.params.id])
        //if user exists
        if(rows.length > 0){
            res.json(rows[0])
        }else{
            res.status(404).send('User not found')
        }
    }catch(err) {
        res.status(500).send(err.message)
    }
}

const updateUserProfile = async (req, res) => {
    try{
        const { email, name } = req.body
        const[ result ] = await db.execute('UPDATE users SET email = ?, name = ? WHERE user_id = ?', [email, name, req.params.id])

        if(result.affectedRows > 0){
            res.send('User updated successfully')
        }
    }catch(err){
        res.status(500).send(err.message)
    }
}

const deleteUser = async(req, res) => {
    try{
        const[result] = await db.execute('DELETE FROM users WHERE user_id = ?', [req.params.id])
        if(result.affectedRows > 0){
            res.send('user deleted successfully')
        }else{
            res.status(404).send('User not found')
        }

    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports(
    getUserProfile,
    updateUserProfile,
    deleteUser
)