import express from "express";

const app = express();

app.get("/api/getemoji", (req, res) => {
  res.send("😂");
});
app.use(express.static("./frontend"));

app.listen(3000, () => {
  console.log("a backend fut");
});
