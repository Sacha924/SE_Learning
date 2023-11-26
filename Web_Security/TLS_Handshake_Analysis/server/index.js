// Import builtin NodeJS modules to instantiate the service
const https = require("https");
const fs = require("fs");
const express = require("express");
const cors = require("cors");



const app = express();
app.use(cors());


// options that will enable https (we need the SSL certificate)
const options = {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
}
// Create a NodeJS HTTPS listener on port 4000 that points to the Express app

https
    .createServer(options, app)
    .listen(4000, () => {
        console.log('server is runing at port 4000')
    });


app.get('/', (req, res) => {
    res.send("Hello from express server.")
})