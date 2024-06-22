const db = require('../DB/Database');

const Rating = {
  create: function (ratingData, callback) {
    const { user_id, block_num, rating } = ratingData;
    db.query(
      "INSERT INTO ratings (user_id, block_num, rating) VALUES (?, ?, ?)",
      [user_id, block_num, rating],
      (error, results) => {
        if (error) throw error;
        callback(null, results);
      }
    );
  },

  // Additional methods like 'find', 'update', 'delete' can be added here similarly
};

module.exports = Rating;
