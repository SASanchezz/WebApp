// Socket

module.exports = function (server) {

    // const socket = require('socket.io')(server)
    const io = require("socket.io")(server);


    io.on("connection", function (client) {
            client.emit("hello", "world");
            console.log('Socket connected');
    })

}