const express = require("express");
const cors = require("cors");
const connection = require("./database/connection");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  return response.status(200).json({ message: "Hello World" });
});

app.post("/register", async (request, response) => {
  try {
    const { name } = request.body;

    console.log(name);

    await connection("user").insert({
      name,
    });

    return response.status(200).json({ message: "Sucessful" });
  } catch (err) {
    console.log(err);
    return response.status(403).json({ error: "Something went wrong" });
  }
});

app.get("/users", async (request, response) => {
  try {
    const users = await connection("user").select("*");

    return response.json(users);
  } catch (err) {
    console.log(err);
    return response.status(403).json({ error: "Something went wrong" });
  }
});

app.listen(3333);
