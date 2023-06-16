const connectToMongo = require("./db");
const express = require("express");

connectToMongo();
const app = express();
const port = 3000;

app.use(express.json()); // to parse the body of the request

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Digipad backend listening at http://localhost:${port}`);
});
