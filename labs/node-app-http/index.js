const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const contentLength = req.headers['content-length'];
    const ws = fs.createWriteStream('./copy.txt');
    let currentLength = 0;

    req.on('data', chunk => {
        currentLength += chunk.length;
        const percentage = parseInt((currentLength / contentLength) * 100);
        res.write(`${percentage}%`);
    });
    req.pipe(ws);
    ws.on('finish', () => {
        res.end();
    });
});

server.listen(3000, () => {
    console.log('http://localhost:3000');
});