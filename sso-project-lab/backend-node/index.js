const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Dummy backend running');
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running at port ${port}/`);
});
