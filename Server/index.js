require("dotenv").config();
const express = require("express")
const app = express();
const cors = require("cors");


const connectDB = require("./db"); 
const User = require("./models/RegisterUserModel");

// middlewares
app.use(express.json());
app.use(cors());

connectDB();

app.use("/", require("./routes/RegisterRoutes"))
app.use("/", require("./routes/RegisterRoutes"))
app.use("/favourite", require("./routes/FavouritesRouter"));
app.use("/", require("./routes/FavouritesRouter"))
app.use("/comments/:movieName", require("./routes/CommentRouter"))


const port = 5000;
app.listen(port, () => {
    console.log(`Listening in ${port}`);
})