-- Supabase Schema Migration

-- Create teams table
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_custom_id TEXT UNIQUE NOT NULL,
    team_name TEXT NOT NULL,
    is_auto_grouped BOOLEAN DEFAULT false,
    has_withdrawn_member BOOLEAN DEFAULT false,
    is_disqualified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create participants table
CREATE TABLE participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    is_individual_registration BOOLEAN DEFAULT false,
    status TEXT CHECK (status IN ('ACTIVE', 'WITHDRAWN', 'ABSENT', 'SUBSTITUTE')) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create events_sig table
CREATE TABLE events_sig (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sig_name TEXT NOT NULL,
    event_name TEXT NOT NULL,
    theme TEXT,
    event_type TEXT CHECK (event_type IN ('SCOTLAND_YARD', 'SQUARE_ONE')) NOT NULL,
    num_rounds INT CHECK (num_rounds <= 2) NOT NULL,
    date DATE NOT NULL,
    venue TEXT NOT NULL,
    timing TEXT NOT NULL
);

-- Create sig_pocs table
CREATE TABLE sig_pocs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sig_id UUID REFERENCES events_sig(id) ON DELETE CASCADE,
    user_id UUID NOT NULL, -- Assuming auth.users(id) mapping when actually deploying
    contact_email TEXT NOT NULL
);

-- Create round_scores_and_attendance table
CREATE TABLE round_scores_and_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    sig_id UUID REFERENCES events_sig(id) ON DELETE CASCADE,
    round_number INT CHECK (round_number IN (1, 2)) NOT NULL,
    attendance_status TEXT CHECK (attendance_status IN ('FULL_3', 'SHORT_2_WITH_BONUS', 'ASSIGNED_SUB', 'ABSENT')) NOT NULL,
    scotland_yard_points NUMERIC DEFAULT 0,
    square_one_points NUMERIC DEFAULT 0,
    bonus_points NUMERIC DEFAULT 0,
    penalties NUMERIC DEFAULT 0,
    completion_time_seconds INT,
    disqualification_flag BOOLEAN DEFAULT false,
    notes_and_infractions TEXT,
    logged_by_poc_id UUID, -- Assuming auth.users(id)
    is_verified_by_head BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create leaderboard_cache table
CREATE TABLE leaderboard_cache (
    team_id UUID PRIMARY KEY REFERENCES teams(id) ON DELETE CASCADE,
    scotland_yard_total NUMERIC DEFAULT 0,
    square_one_total NUMERIC DEFAULT 0,
    bonus_total NUMERIC DEFAULT 0,
    grand_total NUMERIC DEFAULT 0,
    rank INT,
    last_published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes
CREATE INDEX idx_teams_team_custom_id ON teams(team_custom_id);
CREATE INDEX idx_participants_team_id ON participants(team_id);
CREATE INDEX idx_round_scores_team_id ON round_scores_and_attendance(team_id);

-- RLS Settings placeholder (Enable RLS on all tables and create policies as needed)
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE events_sig ENABLE ROW LEVEL SECURITY;
ALTER TABLE sig_pocs ENABLE ROW LEVEL SECURITY;
ALTER TABLE round_scores_and_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_cache ENABLE ROW LEVEL SECURITY;
