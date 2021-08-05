const express = require("express");
const app = express();
const MongoStore = require('connect-mongo')
//Parsers
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require("path");
//Local
const session = require('express-session');
const Routes = require("./routes/route")
//Logger
const logger = require('./logging/logger')(path.join(__filename))
//Socket
const http = require('http')
const server = http.createServer(app)
//Passport
const passport = require('passport')

const PORT = process.env.PORT ?? 3000
//____________________________________________________________________
//Main function
async function start(){
    // Initialize JWT passport
    app.use(passport.initialize())
    app.use(passport.session())
    require('./config/passport')(passport)

    // Add parser for ejs
    app.use(express.json())
    app.use(express.urlencoded({extended: true }))
//____________________________________________________________________
    //Session options
    app.use(session({
        secret: '_Sanchez_',
        key: 'SomeKey',
        cookie: {
            // secure: true,
            path: '/',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // Age of sessions is 1 day
        },
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl: "mongodb://localhost:27017/mydb"})
    }))
    app.use(cookieParser())
    Routes(app); // Add all routes of site
//____________________________________________________________________
    //Set some default packages
    app.set('view engine', 'ejs')
    app.set('views', path.resolve(__dirname, 'templates'))
    app.use(express.static(path.resolve(__dirname, 'public')))

//____________________________________________________________________
    //Set Websocket (Socket-io)
    require('./WebSocket/Socket-io')(server);


    //Listen port
    server.listen(PORT, () => {
        console.log("Started, sir!");
    })
}

start()
