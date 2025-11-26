-- Clear existing data
TRUNCATE TABLE user_progress, chat_scenarios, options, units, chapters CASCADE;

-- 1. Insert Chapters (Real ESL Content)
INSERT INTO chapters (id, title, description, status, stars, position_x, position_y)
VALUES
  ('1', 'The Coffee Shop Meet-Cute', 'Learn how to order coffee and make small talk with a barista.', 'unlocked', 0, 50, 80),
  ('2', 'The Lost Phone', 'Master the art of asking for help and describing lost items.', 'locked', 0, 30, 60),
  ('3', 'The Job Interview', 'Practice answering common interview questions with confidence.', 'locked', 0, 70, 40)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- 2. Insert Units (One per chapter for MVP)
-- Using Google Storage samples as reliable high-quality placeholders
INSERT INTO units (id, chapter_id, video_src, correct_text)
VALUES
  ('u1', '1', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'I would like an oat milk latte with an extra shot, please.'),
  ('u2', '2', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', 'Has anyone seen a blue iPhone? I think I left it here.'),
  ('u3', '3', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 'I have five years of experience in digital marketing and project management.')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Options (For Guessing Game)
-- Chapter 1: Coffee Shop
INSERT INTO options (id, unit_id, text, is_correct)
VALUES
  ('o1_1', 'u1', 'He wants to order a black coffee.', FALSE),
  ('o1_2', 'u1', 'He is ordering a latte with oat milk.', TRUE),
  ('o1_3', 'u1', 'He is asking for the bathroom code.', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Chapter 2: Lost Phone
INSERT INTO options (id, unit_id, text, is_correct)
VALUES
  ('o2_1', 'u2', 'She lost her wallet.', FALSE),
  ('o2_2', 'u2', 'She is looking for the subway.', FALSE),
  ('o2_3', 'u2', 'She lost her phone.', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Chapter 3: Job Interview
INSERT INTO options (id, unit_id, text, is_correct)
VALUES
  ('o3_1', 'u3', 'He is talking about his hobbies.', FALSE),
  ('o3_2', 'u3', 'He is introducing his professional experience.', TRUE),
  ('o3_3', 'u3', 'He is asking about the salary.', FALSE)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Chat Scenarios (Micro-Chat)
-- Chapter 1: Barista Interaction
INSERT INTO chat_scenarios (id, chapter_id, role_name, initial_message)
VALUES
  ('c1', '1', 'Sam (Barista)', 'Hi there! What can I get started for you today?')
ON CONFLICT (id) DO UPDATE SET
  role_name = EXCLUDED.role_name,
  initial_message = EXCLUDED.initial_message;

-- Chapter 2: Stranger Interaction
INSERT INTO chat_scenarios (id, chapter_id, role_name, initial_message)
VALUES
  ('c2', '2', 'Alex (Stranger)', 'Excuse me, you look worried. Is everything okay?')
ON CONFLICT (id) DO UPDATE SET
  role_name = EXCLUDED.role_name,
  initial_message = EXCLUDED.initial_message;

-- Chapter 3: Interviewer Interaction
INSERT INTO chat_scenarios (id, chapter_id, role_name, initial_message)
VALUES
  ('c3', '3', 'Sarah (Hiring Manager)', 'Good morning. Thanks for coming in. Why don''t we start with you telling me a little about yourself?')
ON CONFLICT (id) DO UPDATE SET
  role_name = EXCLUDED.role_name,
  initial_message = EXCLUDED.initial_message;

