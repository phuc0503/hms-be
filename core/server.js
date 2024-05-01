const express = require('express');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
const cors = require('cors');
const initWebRoutes = require('./routes/web');
const middleware = require('./middleware/authentication');
const corsOptions = {
    origin: true,
    credentials: true, //access-control-allow-credentials:true
    optionsSuccessStatus: 200,
};

const app = express();
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME;

app.use(cors(corsOptions));

// app.use(middleware.decodeToken);

//config req.body to get data from client
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);

initWebRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});