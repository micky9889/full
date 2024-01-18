const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { readdirSync } = require("fs"); //read routes auto

//import routes
// const authRoutes = require("./routes/auth");
// const personRoutes = require("./routes/person");

//app
const app = express();

//create folderFile store 
app.use(express.static(__dirname+"/public"))

//Connect Database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("connected..."))
  .catch((err) => {
    console.log("Connect Error:", err);
  });

//middleware
app.use(morgan("dev")); //logging request
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//routes without import
// app.get("/api", (req, res) => {
//   res.send("Hell world");
// });

//routes with import
// app.use("/api", authRoutes);
// app.use("/api", personRoutes);

//read routes auto
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

//port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server run port 8000...");
});
