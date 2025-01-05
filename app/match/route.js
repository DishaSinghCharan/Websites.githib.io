import sqlite3 from "sqlite3";

export async function POST(req) {
  const { user1_id, user2_id } = await req.json();

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

    // Check if the match already exists
    const checkQuery = `
      SELECT * FROM matches
      WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)
    `;
    db.get(
      checkQuery,
      [user1_id, user2_id, user2_id, user1_id],
      function (err, row) {
        if (err) {
          console.error("Error checking for existing match:", err.message);
          reject(new Error("Failed to check for existing match."));
        }

        if (row) {
          // If a match already exists, return a response with a message indicating no new match
          resolve(
            new Response(JSON.stringify({ message: "Match already exists" }), {
              headers: {
                "Content-Type": "application/json",
              },
            })
          );
        } else {
          // Fetch user1 and user2 details including new fields
          const user1Query = `SELECT name, image, description, age, location, bio FROM users WHERE id = ?`;
          const user2Query = `SELECT name, image, description, age, location, bio FROM users WHERE id = ?`;

          db.get(user1Query, [user1_id], (err, user1) => {
            if (err) {
              console.error("Error fetching user1 details:", err.message);
              reject(new Error("Failed to fetch user1 details."));
            }

            db.get(user2Query, [user2_id], (err, user2) => {
              if (err) {
                console.error("Error fetching user2 details:", err.message);
                reject(new Error("Failed to fetch user2 details."));
              }

              // Insert the new match with the details including new fields
              const insertQuery = `
                INSERT INTO matches (user1_id, user2_id, user1_name, user1_image, user1_description, user1_age, user1_location, user1_bio, user2_name, user2_image, user2_description, user2_age, user2_location, user2_bio, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'matched')
              `;
              db.run(
                insertQuery,
                [
                  user1_id,
                  user2_id,
                  user1.name,
                  user1.image,
                  user1.description,
                  user1.age,
                  user1.location,
                  user1.bio,
                  user2.name,
                  user2.image,
                  user2.description,
                  user2.age,
                  user2.location,
                  user2.bio,
                ],
                function (err) {
                  if (err) {
                    console.error("Error inserting match:", err.message);
                    reject(new Error("Failed to insert match."));
                  } else {
                    resolve(
                      new Response(
                        JSON.stringify({ message: "Match added successfully" }),
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      )
                    );
                  }
                }
              );
            });
          });
        }

        db.close();
      }
    );
  });
}
