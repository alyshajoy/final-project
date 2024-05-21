CREATE OR REPLACE FUNCTION check_completed_tasks() RETURNS TRIGGER AS $$
DECLARE
    completed_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO completed_count FROM tasks WHERE user_id = NEW.user_id AND completed = TRUE;
    IF completed_count >= 2 THEN
        -- Check if badge ID 3 is not already active
        IF NOT EXISTS (SELECT 1 FROM user_badges WHERE id = 1 AND status = true) THEN
            -- Send notification for badge ID 1
            PERFORM pg_notify('badge', '1');
            -- Update the status of badge ID 1 to true
            UPDATE user_badges SET status = true WHERE id = 1 AND user_id = NEW.user_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_completed_tasks
AFTER UPDATE OF completed ON tasks
FOR EACH ROW
EXECUTE PROCEDURE check_completed_tasks();