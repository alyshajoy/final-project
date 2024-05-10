CREATE OR REPLACE FUNCTION check_badge_count_trigger() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.badge_count > 3 THEN
        -- Send notification
        PERFORM pg_notify('badge_count_exceeded', NEW.id::text);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER badge_count_trigger
AFTER UPDATE ON badges
FOR EACH ROW
WHEN (NEW.badge_count > OLD.badge_count) -- Only trigger on badge count increase
EXECUTE FUNCTION check_badge_count_trigger();