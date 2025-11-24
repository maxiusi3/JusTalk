-- Create tables for JusTalk

-- Chapters Table
create table if not exists chapters (
  id text primary key,
  title text not null,
  description text,
  status text check (status in ('locked', 'unlocked', 'completed')) default 'locked',
  stars integer default 0,
  position_x integer not null,
  position_y integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Units Table (for Practice)
create table if not exists units (
  id text primary key,
  chapter_id text references chapters(id) on delete cascade,
  video_src text not null,
  correct_text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Options Table (for Guessing Game)
create table if not exists options (
  id text primary key,
  unit_id text references units(id) on delete cascade,
  text text not null,
  is_correct boolean default false
);

-- User Progress Table (Mock for MVP, normally would link to auth.users)
create table if not exists user_progress (
  user_id text not null, -- For now just a string, later auth.uid()
  chapter_id text references chapters(id),
  status text check (status in ('locked', 'unlocked', 'completed')),
  stars integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, chapter_id)
);

-- Chat Scenarios Table
create table if not exists chat_scenarios (
  id text primary key,
  chapter_id text references chapters(id) on delete cascade,
  role_name text not null,
  initial_message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert Seed Data (Idempotent)
insert into chapters (id, title, status, stars, position_x, position_y) values
('1', 'Cafe Encounter', 'unlocked', 0, 50, 80),
('2', 'The Lost Key', 'locked', 0, 30, 60),
('3', 'Subway Talk', 'locked', 0, 70, 40),
('4', 'Dinner Date', 'locked', 0, 50, 20)
on conflict (id) do nothing;

insert into units (id, chapter_id, video_src, correct_text) values
('u1', '1', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', 'We need to talk.')
on conflict (id) do nothing;

insert into options (id, unit_id, text, is_correct) values
('o1', 'u1', 'He wants to break up', true),
('o2', 'u1', 'He wants to order food', false),
('o3', 'u1', 'He is happy', false)
on conflict (id) do nothing;

insert into chat_scenarios (id, chapter_id, role_name, initial_message) values
('c1', '1', 'Sam (Boss)', 'So, did you finish the report?')
on conflict (id) do nothing;
