// Importing dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Importing routes
const user = require("./routes/user");

const app = express();

// Cors setup
app.use(cors());

// Body Parser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("root");
});

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Drawler-server listening at http://localhost:${PORT}`);
});
