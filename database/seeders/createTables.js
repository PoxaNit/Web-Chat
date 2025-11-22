import pool from "../database.js";

async function createTables() {
  let conn;

  try {
    conn = await pool.getConnection();

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

    await conn.query(`
      CREATE TABLE IF NOT EXISTS logins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        user_id INT,
        is_logged TINYINT
      );
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        user_id INT,
        recipient_user_id INT,
        content TEXT,
        read_at BIGINT,
        status INT
      );
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS groups (
        id INT AUTO_INCREMENT PRIMARY KEY,
        created_at BIGINT,
        updated_at BIGINT,
        name VARCHAR(255),
        participant_ids TEXT,
        admin_ids TEXT
      );
    `);


  } catch (err) {
    console.error("Error:", err);

  } finally {

    if (conn) conn.release();

  }
}

export default createTables;
