const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const ErrorHandler = require('./Middleware/ErrorHandler')

const Routes = require("./routes/route")


const app = express();
const PORT = process.env.PORT ?? 3000



async function start(){
    app.use(bodyParser.json())
    app.use(express.urlencoded({extended: true }))
    Routes(app);
    app.use(ErrorHandler)

    app.set('view engine', 'ejs')
    app.set('views', path.resolve(__dirname, 'templates'))


    app.use(express.static(path.resolve(__dirname, 'public')))



    app.listen(PORT, () => {
        console.log("Started, sir!");
    })
}

start()
