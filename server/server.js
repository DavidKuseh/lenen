const express = require("express");

const app = express();

app.use(express.json());

app.get( "/", (req, res, next) => {
    res.send("<p>Landing page</p>")
});

const port = 4000;

app.listen({port}, () => {
    console.log(`server up and running on http://localhost:${port}`)
});