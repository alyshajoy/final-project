DROP TABLE IF EXISTS user_badges CASCADE;

CREATE TABLE user_badges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    badge_id INTEGER NOT NULL,
    earned_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (badge_id) REFERENCES badges(badge_id)
);
