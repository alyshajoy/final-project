DROP TABLE IF EXISTS badges CASCADE;

CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    threshold INTEGER,
    image_url TEXT
);