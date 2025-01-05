// app/matches/route.js
import sqlite3 from "sqlite3";

export const dynamic = "force-static"; // Force static generation
export const revalidate = 10; // Revalidate every 10 seconds

export async function GET(req) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      "./users.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          console.error("Error opening database:", err.message);
          reject(new Error("Failed to connect to the database."));
        }
      }
    );

    const query = `
      SELECT
        m.user1_id,
        m.user2_id,
        u1.name AS user1_name,
        u1.image AS user1_image,
        u1.description AS user1_description,
        u1.age AS user1_age,
        u1.location AS user1_location,
        u1.bio AS user1_bio,
        u2.name AS user2_name,
        u2.image AS user2_image,
        u2.description AS user2_description,
        u2.age AS user2_age,
        u2.location AS user2_location,
        u2.bio AS user2_bio
      FROM matches m
      JOIN users u1 ON m.user1_id = u1.id
      JOIN users u2 ON m.user2_id = u2.id
      WHERE m.status = 'matched'
    `;

    db.all(query, [], (err, rows) => {
      if (err) {
        console.error("Error fetching matches:", err.message);
        reject(new Error("Failed to fetch matches."));
      } else {
        resolve(
          new Response(JSON.stringify(rows), {
            headers: {
              "Content-Type": "application/json",
            },
          })
        );
      }

      db.close();
    });
  });
}
