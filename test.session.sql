--@block
CREATE TABLE activity (
    activityId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    rating INT NOT NULL,
    time_worked INT NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email varchar(255),
    name varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

