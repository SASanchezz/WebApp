const http = require('http')
const path = require('path')
const fs = require('fs')





http.createServer((req, res) => {
    let FileToOpen;
    if (fs.existsSync(__dirname + req.url)) {
    const stats = fs.statSync(__dirname + req.url)

    //console.log(stats.isFile());
    //console.log("MyPath: "+__dirname + req.url);
    if (!stats.isFile()) {
        console.log('Last word: ');
        FileToOpen = path.join(__dirname, req.url, 'index')

    }
    else FileToOpen = path.join(__dirname, req.url)
    console.log(FileToOpen);
    const extension = path.extname(FileToOpen)
    let ContentType = 'text/html'
    if (!extension) {
        FileToOpen += '.html'
    }

    switch (extension) {
        case '.css':
            ContentType = 'text/css'
            break
        case '.js':
            ContentType = 'text/javascript'
            break
        default:
            ContentType = 'text/html'
            break
    }

        res.writeHead(200, {
            'Content-Type': ContentType
        })
        let readableStream = fs.createReadStream(FileToOpen );


        readableStream.pipe(res);
        readableStream.on('error', err => {
            console.log(`Error with reading a file: \n ${err} `)
            throw err;
        })

        //setTimeout(() => {
            readableStream.on('end', function () {
                console.log('The End');
                res.end();
            });
        //}, 20);

    }

}).listen(3000, () => {
    console.log('It works');
})