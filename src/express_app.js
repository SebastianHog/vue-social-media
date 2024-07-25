const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  getAllUsers,
  getUserById,
  registerUser,
  clearUsers,
  addPost,
  getAllPosts,
  getPostById,
  getPostsByUser,
  getUserByEmail,
} = require("../database.js");

app.use((req, res, next) => {
  if (req.path === "/login" || req.path === "/register") {
    return next();
  }
  authenticateToken(req, res, next);
});

app.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      console.log("Information missing");
      return res.status(400).send("Information missing");
    } else {
      console.log("Password before hashing: ", password);
      const hashedPW = await bcrypt.hash(password, 10);
      console.log("Same password, after hashing: ", hashedPW);
      const newUser = await registerUser(username, hashedPW, email);
      res.status(201).send(newUser);
    }
  } catch (err) {
    console.log("something went wrong: ", err);
    res.status(500).send("Server error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).send("User not found");
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const accessToken = jwt.sign(
          { email: email, userId: user.id },
          process.env.ACCESS_TOKEN_SECRET
        );
        res.status(200).json({ accessToken });
      } else {
        console.log("Wrong password entered");
        res.status(401).send("Wrong password entered");
      }
    });
  } catch (e) {
    console.log("error: ", e);
    res.status(500).send("Server error");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    console.log("Error getting users: ", err);
    res.status(500).send("Server error");
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    res.status(200).send(user);
  } catch (err) {
    console.log("Error getting user: ", err);
    res.status(500).send("Server error");
  }
});

app.delete("/clearUsers", async (req, res) => {
  try {
    await clearUsers();
    console.log("Users cleared");
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    console.log("Error clearing users: ", err);
    res.status(500).send("Server error");
  }
});

app.post("/post", async (req, res) => {
  const { author_id, text, media_type, media_url } = req.body;
  if (!author_id) return console.log("Author & text is required");
  else {
    const newPost = await addPost(author_id, text, media_type, media_url);
    res.send(newPost);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).send(posts);
  } catch (err) {
    console.log("Error getting posts: ", err);
    res.status(500).send("Server error");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3156, () => {
  console.log("Server is running on port: 3156");
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("dsadsa", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("No token provided");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification failed: ", err);
      return res.status(403).send("Token verification failed");
    }
    req.email = decoded.email;
    req.userId = decoded.userId;
    console.log("Token verified, user ID: ", req.userId);
    next();
  });
}
