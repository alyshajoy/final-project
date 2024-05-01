CREATE TABLE motivational_quotes (
    quote_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    last_date_used DATE
);
