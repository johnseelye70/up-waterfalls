-- Add YouTube video ID column to the waterfalls table
ALTER TABLE waterfalls ADD COLUMN IF NOT EXISTS youtube_video_id text;

-- (Optional) Example: Update Tahquamenon Falls with a video ID if you want to test immediately
-- UPDATE waterfalls SET youtube_video_id = 'P3oXQW2R2bE' WHERE name = 'Tahquamenon Falls';
