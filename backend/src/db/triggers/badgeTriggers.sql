CREATE OR REPLACE FUNCTION check_badge_count_trigger() RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM badges WHERE status = true) >= 3 THEN
        -- Check if badge ID 1 is already active
        IF NOT EXISTS (SELECT 1 FROM badges WHERE id = 1 AND status = true) THEN
            -- Send notification for badge ID 1
            PERFORM pg_notify('badge_count_exceeded', '1');
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER badge_count_trigger
AFTER UPDATE ON badges
FOR EACH ROW
WHEN (NEW.badge_count > OLD.badge_count) -- Only trigger on badge count increase
EXECUTE FUNCTION check_badge_count_trigger();