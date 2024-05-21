CREATE OR REPLACE FUNCTION check_badge_count_trigger() RETURNS TRIGGER AS $$
DECLARE
    completed_count INTEGER;
BEGIN
    -- Count how many badges have status true after the update
    SELECT COUNT(*) INTO completed_count FROM user_badges WHERE status = true AND user_id = NEW.user_id;

    -- Check if the count of badges with status true is 3 or more
    IF completed_count >= 3 THEN
        -- Check if badge ID 3 is not already active
        IF NOT EXISTS (SELECT 1 FROM user_badges WHERE id = 3 AND status = true) THEN
            -- Send notification for badge ID 3
            PERFORM pg_notify('badge', '3');
            -- Update the status of badge ID 3 to true
            UPDATE user_badges SET status = true WHERE id = 3 AND user_id = NEW.user_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER badge_count_trigger
AFTER UPDATE ON user_badges
FOR EACH ROW
EXECUTE PROCEDURE check_badge_count_trigger();