const bodyParser = require("body-parser");
const express = require("express");
const { connectToMongo } = require("./db");

const app = express();
const port = 1234;

async function startServer() {
  try {

    await connectToMongo();
    const del = require("./delete");
    const post = require("./post");
    const get = require("./get");
    const mymiddlewares = require("./authenticate");
    
    app.use(express.json());
    app.use(mymiddlewares.logger);
    app.use(post);
    app.use(get);
    app.use(del);
    
    app.get('/authorize', (req,res) => {
        res.send("you now have access to system");
    });

    app.listen(port, () => {
        console.log(`Running on port http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}
startServer();