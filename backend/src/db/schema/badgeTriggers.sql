CREATE OR REPLACE FUNCTION check_badge_count_trigger() RETURNS TRIGGER AS $$
DECLARE
    current_true_count INTEGER;
BEGIN
    -- Count how many badges have status true after the update
    SELECT COUNT(*) INTO current_true_count FROM badges WHERE status = true;

    -- Check if the count of badges with status true is 3 or more
    IF current_true_count >= 3 THEN
        -- Check if badge ID 1 is not already active
        IF NOT EXISTS (SELECT 1 FROM badges WHERE id = 1 AND status = true) THEN
            -- Send notification for badge ID 1
            PERFORM pg_notify('badge', '1');
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER badge_count_trigger
AFTER UPDATE ON badges
FOR EACH ROW
EXECUTE PROCEDURE check_badge_count_trigger();