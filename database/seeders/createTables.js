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
      );
    `);

    // CONVERSATIONS
    await conn.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        user1_id INT NULL,
        user2_id INT NULL,
        group_id INT NULL,
        type ENUM('private', 'group')
      );
    `);

    // MESSAGES
    await conn.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        conversation_id INT,
        sender_id INT,
        content TEXT
      );
    `);

    // MESSAGE STATUS
    await conn.query(`
      CREATE TABLE IF NOT EXISTS message_status (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        message_id INT,
        user_id INT,
        status ENUM('sent', 'delivered', 'read')
      );
    `);

    // INVITES TO GROUP
    await conn.query(`
      CREATE TABLE IF NOT EXISTS invites_to_group (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        group_id INT,
        inviter_id INT,
        invited_id INT,
        status ENUM('sent', 'delivered', 'accepted', 'refused')
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
