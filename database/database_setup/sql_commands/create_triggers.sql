CREATE TRIGGER ReachedMaxReport
AFTER UPDATE ON Post
FOR EACH ROW
BEGIN
	IF NEW.report_count >= 15 THEN
    UPDATE Profile SET Profile.post_count = Profile.post_count - 1 WHERE Profile.user_email = NEW.user_email;
	UPDATE User Set User.points = User.points - 10 WHERE User.user_email = NEW.user_email;
	DELETE FROM Report WHERE Report.post_url = NEW.post_url;
	DELETE FROM AttachedBy WHERE AttachedBy.post_url = NEW.post_url;
	END if;
END
