const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

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

app.listen(5000, () => {
  console.log(`App has been started at port ${PORT}`);
});
