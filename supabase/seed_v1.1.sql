-- Clear existing data (optional, for clean slate in dev)
truncate table user_progress, chat_scenarios, options, units, chapters cascade;

-- Insert Chapters
insert into chapters (id, title, description, status, stars, position_x, position_y) values
('1', 'Cafe Encounter', 'Order coffee like a local.', 'unlocked', 0, 50, 80),
('2', 'The Lost Key', 'Panic! Where is my key?', 'unlocked', 0, 30, 60),
('3', 'Subway Talk', 'Navigating the underground.', 'locked', 0, 70, 40),
('4', 'Dinner Date', 'Impress your date.', 'locked', 0, 50, 20);

-- Insert Units for Chapter 1
insert into units (id, chapter_id, video_src, correct_text) values
('u1_1', '1', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'We need to talk.'),
('u1_2', '1', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', 'Just a black coffee, please.');

-- Insert Options for Chapter 1
insert into options (id, unit_id, text, is_correct) values
('o1_1_1', 'u1_1', 'He wants to break up', true),
('o1_1_2', 'u1_1', 'He wants to order food', false),
('o1_1_3', 'u1_1', 'He is happy', false),
('o1_2_1', 'u1_2', 'Ordering a drink', true),
('o1_2_2', 'u1_2', 'Asking for the bill', false),
('o1_2_3', 'u1_2', 'Complaining about noise', false);

-- Insert Units for Chapter 2
insert into units (id, chapter_id, video_src, correct_text) values
('u2_1', '2', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', 'I can''t find it anywhere!');

-- Insert Options for Chapter 2
insert into options (id, unit_id, text, is_correct) values
('o2_1_1', 'u2_1', 'She lost something important', true),
('o2_1_2', 'u2_1', 'She is playing hide and seek', false),
('o2_1_3', 'u2_1', 'She is buying a gift', false);

-- Insert Chat Scenarios
insert into chat_scenarios (id, chapter_id, role_name, initial_message) values
('c1', '1', 'Sam (Barista)', 'Hi there! What can I get for you today?'),
('c2', '2', 'Security Guard', 'Excuse me, miss. Did you lose something?');
