CREATE OR REPLACE FUNCTION send_test_notification_trigger() RETURNS TRIGGER AS $$
BEGIN
    -- Send a test notification whenever anything updates in the badges table
    PERFORM pg_notify('test_notification', 'Test message');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER send_test_notification_trigger
AFTER UPDATE ON badges
FOR EACH ROW
EXECUTE FUNCTION send_test_notification_trigger();
