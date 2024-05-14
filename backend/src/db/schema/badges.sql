DROP TABLE IF EXISTS badges CASCADE;

CREATE TABLE badges (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    threshold INTEGER,
    image_url TEXT NOT NULL,
    status BOOLEAN NOT NULL
);