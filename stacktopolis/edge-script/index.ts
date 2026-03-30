/**
 * Stacktopolis Leaderboard — Bunny Edge Script
 *
 * Standalone edge script that serves the leaderboard API.
 * Uses Bunny Database (libSQL) for persistence.
 *
 * Endpoints:
 *   GET  /scores?limit=20&difficulty=normal  — fetch top scores
 *   POST /scores                             — submit a new score
 *
 * Environment secrets (added via Bunny dashboard "Add Secrets to Edge Script"):
 *   BUNNY_DATABASE_URL        — libsql://your-database-id.lite.bunnydb.net
 *   BUNNY_DATABASE_AUTH_TOKEN — full-access token
 *
 * Database setup (run once via Bunny DB shell):
 *   CREATE TABLE IF NOT EXISTS scores (
 *     id INTEGER PRIMARY KEY AUTOINCREMENT,
 *     initials TEXT NOT NULL,
 *     total_score INTEGER NOT NULL,
 *     quarters INTEGER NOT NULL,
 *     title TEXT NOT NULL,
 *     independence INTEGER NOT NULL,
 *     cause TEXT NOT NULL,
 *     difficulty TEXT NOT NULL,
 *     created_at TEXT DEFAULT (datetime('now'))
 *   );
 *   CREATE INDEX idx_scores_total ON scores(total_score DESC);
 *   CREATE INDEX idx_scores_difficulty ON scores(difficulty, total_score DESC);
 */

import * as BunnySDK from "@bunny.net/edgescript-sdk";
import { createClient } from "https://esm.sh/@libsql/client@0.14/web";

const ALLOWED_ORIGIN = "https://techfreedom.eu";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function validateScore(body: Record<string, unknown>): string | null {
  if (!body || typeof body !== "object") return "Invalid request body";
  if (typeof body.initials !== "string" || !/^[A-Z]{3}$/.test(body.initials))
    return "Initials must be 3 uppercase letters";
  if (
    typeof body.totalScore !== "number" ||
    body.totalScore < 0 ||
    body.totalScore > 9999
  )
    return "Invalid score";
  if (
    typeof body.quarters !== "number" ||
    body.quarters < 0 ||
    body.quarters > 999
  )
    return "Invalid quarters";
  if (typeof body.title !== "string" || body.title.length > 100)
    return "Invalid title";
  if (
    typeof body.independence !== "number" ||
    body.independence < 0 ||
    body.independence > 100
  )
    return "Invalid independence";
  if (typeof body.cause !== "string" || body.cause.length > 50)
    return "Invalid cause";
  if (
    typeof body.difficulty !== "string" ||
    !["easy", "normal", "hard"].includes(body.difficulty)
  )
    return "Invalid difficulty";
  return null;
}

function getDb() {
  return createClient({
    url: Deno.env.get("BUNNY_DATABASE_URL")!,
    authToken: Deno.env.get("BUNNY_DATABASE_AUTH_TOKEN")!,
  });
}

BunnySDK.net.http.serve(async (request: Request): Promise<Response> => {
  // CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  const url = new URL(request.url);

  // GET /scores
  if (url.pathname === "/scores" && request.method === "GET") {
    const difficulty = url.searchParams.get("difficulty");
    const limit = Math.min(
      parseInt(url.searchParams.get("limit") || "20", 10),
      50,
    );

    const db = getDb();
    let result;

    if (difficulty && ["easy", "normal", "hard"].includes(difficulty)) {
      result = await db.execute({
        sql: "SELECT initials, total_score, quarters, title, independence, cause, difficulty, created_at FROM scores WHERE difficulty = ? ORDER BY total_score DESC LIMIT ?",
        args: [difficulty, limit],
      });
    } else {
      result = await db.execute({
        sql: "SELECT initials, total_score, quarters, title, independence, cause, difficulty, created_at FROM scores ORDER BY total_score DESC LIMIT ?",
        args: [limit],
      });
    }

    const scores = result.rows.map((row) => ({
      initials: row.initials,
      totalScore: row.total_score,
      quarters: row.quarters,
      title: row.title,
      independence: row.independence,
      cause: row.cause,
      difficulty: row.difficulty,
      date: row.created_at,
    }));

    return json({ scores });
  }

  // POST /scores
  if (url.pathname === "/scores" && request.method === "POST") {
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }

    const error = validateScore(body);
    if (error) return json({ error }, 400);

    const db = getDb();
    await db.execute({
      sql: "INSERT INTO scores (initials, total_score, quarters, title, independence, cause, difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [
        body.initials,
        body.totalScore,
        body.quarters,
        body.title,
        body.independence,
        body.cause,
        body.difficulty,
      ],
    });

    return json({ ok: true }, 201);
  }

  return json({ error: "Not found" }, 404);
});
