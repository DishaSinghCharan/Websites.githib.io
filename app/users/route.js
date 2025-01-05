// app/users/route.js
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
      SELECT * FROM users
    `;

    db.all(query, [], (err, rows) => {
      if (err) {
        console.error("Error fetching users:", err.message);
        reject(new Error("Failed to fetch users."));
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
