CREATE TABLE calendar_events (
    event_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    date DATE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    description TEXT,
    location VARCHAR(255),
    recurrence_pattern VARCHAR(50),  -- Could be 'daily', 'weekly', 'monthly', 'yearly'
    recurrence_end_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
