const http = require('http');
const server = http.createServer();

server.on('request', (req, res) => {
  if (req.method === 'POST' && req.url == '/reto') {
    let body = [];
    
    req.on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      body = Buffer.concat(body).toString();

      let date = new Date(body);
      let day = date.getDay();
      let week = ['sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

      res.end(`Your born day is ${week[day]}`);
    })
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8001);
console.log('Servidor en la url http://localhost:8001');