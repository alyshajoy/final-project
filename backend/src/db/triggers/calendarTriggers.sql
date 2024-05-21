CREATE OR REPLACE FUNCTION completed_events() RETURNS TRIGGER AS $$
DECLARE
    completed_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO completed_count FROM calendar_events WHERE user_id = NEW.user_id;
    IF completed_count >= 25 THEN
        -- Check if badge ID 2 is not already active
        IF NOT EXISTS (SELECT 1 FROM user_badges WHERE id = 2 AND status = true) THEN
            -- Send notification for badge ID 1
            PERFORM pg_notify('badge', '2');
            -- Update the status of badge ID 1 to true
            UPDATE user_badges SET status = true WHERE id = 2 AND user_id = NEW.user_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER completed_events
AFTER INSERT OR UPDATE ON calendar_events
FOR EACH ROW
EXECUTE PROCEDURE completed_events();