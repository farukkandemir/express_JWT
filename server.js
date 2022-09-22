const express = require("express");
const path = require("path");

const usersRoutes = require("./routes/users");
const registerRoutes = require("./routes/register");
const authRoutes = require("./routes/auth");
const verifyJWT = require("./middleware/verifyJWT");

const app = express();

app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/register", registerRoutes);
app.use("/auth", authRoutes);
app.use(verifyJWT);
app.use("/users", usersRoutes);

app.use("*", (req, res) => {
  res.status(404);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening at port : ${PORT}`));
