require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Define other routes here

const groupRoutes = require("./routes/groups");
const teacherRoutes = require("./routes/teachers");
const sessionRoutes = require("./routes/sessions");
const studentRoutes = require("./routes/students");
app.use("/api", groupRoutes, teacherRoutes, sessionRoutes, studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
