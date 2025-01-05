const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./users.db");

// Create the users table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      age INTEGER NOT NULL,
      location TEXT NOT NULL,
      bio TEXT NOT NULL
    )
  `);

  // Create the matches table to store the relationship between swiped users
  db.run(`
    CREATE TABLE IF NOT EXISTS matches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user1_id INTEGER NOT NULL,
      user2_id INTEGER NOT NULL,
      user1_name TEXT NOT NULL,
      user1_image TEXT NOT NULL,
      user1_description TEXT NOT NULL,
      user1_age INTEGER NOT NULL,
      user1_location TEXT NOT NULL,
      user1_bio TEXT NOT NULL,
      user2_name TEXT NOT NULL,
      user2_image TEXT NOT NULL,
      user2_description TEXT NOT NULL,
      user2_age INTEGER NOT NULL,
      user2_location TEXT NOT NULL,
      user2_bio TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'matched',
      FOREIGN KEY (user1_id) REFERENCES users(id),
      FOREIGN KEY (user2_id) REFERENCES users(id)
    )
  `);

  // Insert some example data into users table (if not already present)
  db.get("SELECT COUNT(*) AS count FROM users", (err, row) => {
    if (err) {
      console.error("Error checking user count:", err.message);
      return;
    }

    if (row.count === 0) {
      db.run(
        "INSERT INTO users (name, image, description, age, location, bio) VALUES ('Grandfather Henry', '/Website.github.io/animepfp.jpg', 'Loves spending time with family and sharing stories.', 68, 'Texas', 'A warm-hearted grandfather looking to connect with others for meaningful conversations and family bonding.')"
      );
      db.run(
        "INSERT INTO users (name, image, description, age, location, bio) VALUES ('Grandmother Alice', '/Website.github.io/person2.jpg', 'Enjoys reading, gardening, and knitting.', 72, 'California', 'A sweet grandmother looking for a companion to share experiences and stories.')"
      );
      db.run(
        "INSERT INTO users (name, image, description, age, location, bio) VALUES ('Tommy', '/Website.github.io/person3.jpg', 'An energetic boy who loves to play and make new friends.', 10, 'Florida', 'A young boy who enjoys playing sports and meeting people who can share his playful spirit.')"
      );
      db.run(
        "INSERT INTO users (name, image, description, age, location, bio) VALUES ('Lucy', '/Website.github.io/person4.jpg', 'Curious and creative girl who loves arts and crafts.', 8, 'Ohio', 'A bright young girl looking for a friend who loves to create and explore new ideas together.')"
      );
    }

    // Close the database after all operations are completed
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err.message);
      } else {
        console.log("Database connection closed successfully.");
      }
    });
  });
});
