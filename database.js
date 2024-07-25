const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql
  .createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// Return all users
const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  console.log("idiot", rows);
  return rows;
};

//Return all posts
const getAllPosts = async () => {
  const [rows] = await pool.query("SELECT * FROM posts");
  return rows;
};

//Get user by  user id.
const getUserById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

const getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

//Get a post by post id
const getPostById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM posts WHERE id = ?", [id]);
  return rows[0];
};

//Get all posts by user
const getPostsByUser = async (author_id) => {
  const [rows] = await pool.query("SELECT * FROM posts WHERE author_id = ?", [
    author_id,
  ]);
  return rows;
};

// Register a new user, supplying a username. Returns the newly created user.
const registerUser = async (username, password, email) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO users (username, password, email) VALUES (?,?,?)",
      [username, password, email]
    );
    const id = result.insertId;
    return getUserById(id);
  } catch (error) {
    switch (error.code) {
      case "ER_DUP_ENTRY":
        return "Username already registered";
    }
  }
};

const clearUsers = async () => {
  await pool
    .query("DELETE FROM users")
    .then(await pool.query("ALTER TABLE users AUTO_INCREMENT = 1"));
  // .then(await pool.query("TRUNCATE TABLE users"));
  return getAllUsers();
};

const addPost = async (author_id, content, media_type, media_url) => {
  try {
    const [result] = await pool.query(
      "INSERT INTO posts (author_id, content, media_type, media_url) VALUES (?,?,?,?)",
      [author_id, content, media_type, media_url]
    );
    return result;
  } catch (e) {
    console.log("Error posting: ", e);
  }
};

module.exports = {
  getAllUsers,
  getAllPosts,
  getUserById,
  getUserByEmail,
  getPostById,
  registerUser,
  addPost,
  clearUsers,
  getPostsByUser,
};

console.log("Browsarr server is running.");
