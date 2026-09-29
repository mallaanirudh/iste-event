ALTER TABLE "teams" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "participants" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "user_roles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "events_sig" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "sig_pocs" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "round_scores_and_attendance" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "leaderboard_cache" ENABLE ROW LEVEL SECURITY;

-- Read policies for public/participant facing tables
CREATE POLICY "Anyone can view leaderboard" ON "leaderboard_cache" FOR SELECT TO authenticated USING (true);
CREATE POLICY "Anyone can view events" ON "events_sig" FOR SELECT TO authenticated USING (true);

-- Participants can read their own data
CREATE POLICY "Users can view own role" ON "user_roles" FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Participants can view own registration" ON "participants" FOR SELECT TO authenticated USING (auth.uid() = id);

-- Admins (events_coordinator) have full access to most tables
CREATE POLICY "Admins can manage teams" ON "teams" FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'events_coordinator')
);

CREATE POLICY "Admins can manage participants" ON "participants" FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'events_coordinator')
);

CREATE POLICY "Admins can manage events" ON "events_sig" FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'events_coordinator')
);

-- POCs can insert/update scores for their events
CREATE POLICY "POCs can manage scores for assigned events" ON "round_scores_and_attendance" FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role IN ('poc', 'events_coordinator'))
);
