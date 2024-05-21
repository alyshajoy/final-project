CREATE OR REPLACE FUNCTION timer_trigger() RETURNS TRIGGER AS $$
DECLARE
    completed_count INTEGER;
BEGIN
    IF NEW.timer_active = true THEN
        -- Check if badge ID 3 is not already active
        IF NOT EXISTS (SELECT 1 FROM user_badges WHERE id = 4 AND status = true) THEN
            -- Send notification for badge ID 4
            PERFORM pg_notify('badge', '4');
            -- Update the status of badge ID 4 to true
            UPDATE user_badges SET status = true WHERE id = 4 AND user_id = NEW.id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER timer_trigger
AFTER INSERT OR UPDATE OF timer_active ON users
FOR EACH ROW
EXECUTE PROCEDURE timer_trigger();