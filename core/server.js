const express = require('express');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
require('./config/connectDB');
require('./mqtt/sub');
const initWebRoutes = require('./routes/web');

const app = express();
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME;

//config req.body to get data from client
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);

initWebRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});