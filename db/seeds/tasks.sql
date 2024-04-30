INSERT INTO tasks (user_id, title, description, priority, due_date, status, created_at, updated_at)
VALUES
(1, 'Finish Project', 'Complete the final touches on the project.', 1, '2024-05-10', 'pending', NOW(), NOW()),
(2, 'Start Blog Post', 'Write the first draft of the upcoming blog post.', 2, '2024-05-15', 'pending', NOW(), NOW()),
(3, 'Update Resume', 'Update the resume with the latest job experiences.', 3, '2024-05-20', 'pending', NOW(), NOW()),
(1, 'Review Code', 'Conduct a thorough review of the new feature code.', 1, '2024-05-05', 'pending', NOW(), NOW()),
(1, 'Team Meeting', 'Discuss project progress and allocate resources for the next phase.', 2, '2024-05-08', 'completed', NOW(), NOW()),
(2, 'Fix Bugs', 'Address the top priority bugs reported by the QA team.', 1, '2024-05-12', 'pending', NOW(), NOW()),
(3, 'Prepare Presentation', 'Prepare the monthly project status presentation for stakeholders.', 3, '2024-05-18', 'pending', NOW(), NOW()),
(3, 'Client Call', 'Discuss project requirements and feedback with the client.', 2, '2024-05-06', 'pending', NOW(), NOW()),
(2, 'Document API', 'Update the API documentation with the latest endpoint changes.', 3, '2024-05-14', 'completed', NOW(), NOW()),
(1, 'Research New Tools', 'Research new project management tools that could improve team workflow.', 2, '2024-05-22', 'pending', NOW(), NOW());
