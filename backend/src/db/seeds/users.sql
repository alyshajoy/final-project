INSERT INTO users (first_name, last_name, email, password_hash, created_at, last_login, username)
VALUES
('Jane', 'Smith', 'jane.smith@example.com', 'hashedpassword2', NOW(), NOW(), 'janesmith'),
('John', 'Doe', 'john.doe@example.com', 'hashedpassword1', NOW(), NOW(), 'johndoe'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'hashedpassword3', NOW(), NOW(), 'alicejohnson'),
('Trish', 'Ramberan', 'trish.ramberan@example.com', 'hashedpassword3', NOW(), NOW(), 'trishramberan');
