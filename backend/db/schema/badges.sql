CREATE TABLE badges (
    badge_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    threshold INTEGER,
    image_url TEXT
);