import pool from "../database.js";

async function createTables() {
  let conn;

  try {
    conn = await pool.getConnection();

    // USERS
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        name VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    // LOGINS
    await conn.query(`
      CREATE TABLE IF NOT EXISTS logins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        user_id INT,
        is_logged TINYINT(1)
        -- FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    // GROUPS
    await conn.query(`
      CREATE TABLE IF NOT EXISTS groups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        name VARCHAR(255),
        creator_user_id INT
        -- FOREIGN KEY (creator_user_id) REFERENCES users(id)
      );
    `);

    // GROUP PARTICIPANTS
    await conn.query(`
      CREATE TABLE IF NOT EXISTS group_participants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        group_id INT,
        user_id INT,
        role ENUM('user', 'admin')
        -- FOREIGN KEY (group_id) REFERENCES groups(id),
        -- FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    // MESSAGES
    await conn.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        user_id INT,
        recipient_user_id INT,
        recipient_group_id INT,
        content TEXT
        -- FOREIGN KEY (user_id) REFERENCES users(id),
        -- FOREIGN KEY (recipient_user_id) REFERENCES users(id),
        -- FOREIGN KEY (recipient_group_id) REFERENCES groups(id)
      );
    `);

    // MESSAGE STATUS / RECEIPTS
    await conn.query(`
      CREATE TABLE IF NOT EXISTS message_status (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        message_id INT,
        user_id INT,
        status ENUM('sent', 'delivered', 'read')
        -- FOREIGN KEY (message_id) REFERENCES messages(id),
        -- FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    console.log("All tables created successfully!");

  } catch (err) {
    console.error("Error:", err);

  } finally {
    if (conn) conn.release();
  }
}

export default createTables;
