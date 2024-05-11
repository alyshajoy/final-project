DROP TABLE IF EXISTS calendar_events CASCADE;

CREATE TABLE calendar_events (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    date DATE,
    start_time VARCHAR(255),
    end_time VARCHAR(255),
    all_day boolean DEFAULT false,
    description TEXT,
    location VARCHAR(255),
    recurrence_pattern VARCHAR(50),  -- Could be 'daily', 'weekly', 'monthly', 'yearly'
    recurrence_end_date TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
