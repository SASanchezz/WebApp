const express = require("express");
const app = express();
//Parsers
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require("path");
//Local
const Routes = require("./routes/route")
const config = require('./config/config')
//Cookies
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
//Logger
const logger = require('./logging/logger')(path.join(__filename))
//Socket
const http = require('http')
const server = http.createServer(app)
//Passport
const passport = require('passport')
const PORT = process.env.PORT ?? 3000

//_________________Main function_______________________________________
async function start(){
    // Initialize JWT passport
    app.use(cookieParser())
    app.use(flash())
    require('./config/passport')(passport)

    // Add parsers

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));


//_____________________Session options___________________________
    app.use(cookieSession({ //for session
        maxAge: 24*60*60*1000,              // milliseconds of a day
        keys: [config.secret]
        // store: MongoStore.create({mongoUrl: "mongodb://localhost:27017/mydb"})
    })
    );

    app.use(passport.initialize())
    app.use(passport.session())
    // app.use(cookieParser())  //for cookie

    Routes(app); // Add all routes of app

//_______________________Set some default packages_____________________________
    app.set('view engine', 'ejs')
    app.set('views', path.resolve(__dirname, 'templates'))
    app.use(express.static(path.resolve(__dirname, 'public')))

//___________________Set Websocket (Socket-io)__________________________
    require('./WebSocket/Socket-io')(server);


    //Listen port
    server.listen(PORT, () => {
        console.log("Started, sir!");
    })
}

start()
