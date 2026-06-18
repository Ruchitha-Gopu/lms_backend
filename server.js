const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || 5000;


const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

  app.get("/", (req, res) => {
  res.send("LMS Backend Running Successfully 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/dashboard",
  require("./routes/dashboardRoutes")
);
app.use(
  "/api/assignments",
  require("./routes/assignmentRoutes")
);
app.use(
  "/api/quiz",
  require("./routes/quizRoutes")
);
 app.use(
  "/api/progress",
  require(
  "./routes/progressRoutes")
);
app.use(
  "/api/certificates",
  require("./routes/certificateRoutes")
);
app.use(
  "/api/profile",
  require("./routes/profileRoutes")
);
app.use(
  "/api/settings",
  require("./routes/settingsRoutes")
);

app.use(
  "/api/settings",
  require("./routes/settingsRoutes")
);
  
//admin panel

app.use(
  "/api/courses",
  require("./routes/courseRoutes")
);

app.use(
  "/api/students",
  require("./routes/studentRoutes")
);

app.use("/api/admin", require("./routes/adminRoutes"));

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});