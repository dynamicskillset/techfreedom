-- Stacktopolis leaderboard schema for Cloudflare D1
CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  initials TEXT NOT NULL,
  total_score INTEGER NOT NULL,
  quarters INTEGER NOT NULL,
  title TEXT NOT NULL,
  independence INTEGER NOT NULL,
  cause TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'normal',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_scores_total ON scores(total_score DESC);
CREATE INDEX IF NOT EXISTS idx_scores_difficulty ON scores(difficulty, total_score DESC);
