DROP TABLE IF EXISTS motivational_quotes CASCADE;

CREATE TABLE motivational_quotes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    last_date_used DATE
);
