const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const MongoStore = require('connect-mongo')

const Routes = require("./routes/route")


const app = express();
const PORT = process.env.PORT ?? 3000



async function start(){
    app.use(bodyParser.json())
    app.use(express.urlencoded({extended: true }))


    app.use(session({
        secret: '_Sanchez_',
        key: 'SomeKey',
        cookie: {
            secure: true,
            path: '/',
            httpOnly: true,
            maxAge: null
        },
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({mongoUrl: "mongodb://localhost:27017/mydb"})
    }))
    app.use(cookieParser())

    // app.use(function (req, res, next) {
    //     req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1 ;
    //     console.log('Visits: ' + req.session.numberOfVisits);
    // })

    Routes(app);

    app.set('view engine', 'ejs')
    app.set('views', path.resolve(__dirname, 'templates'))


    app.use(express.static(path.resolve(__dirname, 'public')))


    app.listen(PORT, () => {
        console.log("Started, sir!");
    })
}

start()
