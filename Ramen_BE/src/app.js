const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    require('dotenv').config();
}
const express = require('express'),
    socket = require('socket.io'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    config = require('./config/global-config'),
    cookieSession = require('cookie-session'),
    helmet = require('helmet'),
    log = require('./modules/logger'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    errorhandler = require('errorhandler'),
    response = require('./modules/responseMessage');


const app = express();
const corsOptions = {
    origin: process.env.FE_DOMAIN,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(helmet({contentSecurityPolicy: isProduction ? undefined : false}));
require('./config/passport')(passport);
require("./db/connectDB");
require('./models/registerModel');

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
    name: 'connect.sid',
    keys: [process.env.SESSION_SECRET_KEY],
    maxAge: config.SESSION_MAX_AGE // 24 hours
}))

app.use((req, res, next) => {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
    next()
})

//Passport Middleware init local strategy
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());

//error handler
if (!isProduction) {
    app.use(errorhandler());
}

app.use(function (err, req, res, next) {
    response.internalServerError(res, err.message);
});


//api routes
app.use('/test',(req, res)=>{
    res.send("Hello world!!")
})

app.use('/api/v1', require('./api/v1/api-router'));

app.get('/:else', (req, res) => {
    res.send("No such pass exist.");
})

//handle http server and socket io
const PORT = process.env.PORT || process.env.DOKKU_DOCKERFILE_PORTS;

const server = app.listen(PORT, log.info(`Server started on port ${PORT}`));
const io = socket(server);
io.on('connection', (socket) => {
    log.info('socket connection on', socket.id);
})