const http = require('http');

const PROXY_PORT = 8080;

http.createServer(handleRequest).listen(PROXY_PORT);

function handleRequest(clientReq, clientRes) {
    delete clientReq.headers['proxy-connection'];

    const options = {
        hostname: clientReq.headers.host,
        port: 80,
        path: clientReq.url,
        method: clientReq.method,
        headers: clientReq.headers
    };

    const proxy = http.request(options, (res) => {
        clientRes.writeHead(res.statusCode, res.headers)
        res.pipe(clientRes);
    });

    clientReq.pipe(proxy);
}
