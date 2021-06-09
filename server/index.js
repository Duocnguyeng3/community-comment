const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from the server!",
  });
});

app.all("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
