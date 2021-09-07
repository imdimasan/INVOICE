const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = config.get("port") || 5000;
const URL = config.get("mongoUrl");
const AUTHROUTES = require("./routes/auth.routes");
const LINKS = require("./routes/link.routes");
const CLIENTS = require("./routes/client.routes");

// Роутинг
app.use(express.json({ extended: true }));
app.use("/api/auth", AUTHROUTES);
app.use("/api/link", LINKS);
app.use("/api/client", CLIENTS);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "..", "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.hml"));
  });
}

// Коннект к БД
async function start() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    process.exit(1);
  }
}

// Запуск сервера
start();

app.listen(PORT, () => {
  console.log(`App has been started at port ${PORT}`);
});
