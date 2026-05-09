const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const target = process.env.TARGET_DOMAIN || 'google.com';

const server = http.createServer((req, res) => {
  proxy.web(req, res, { 
    target: `http://${target}`,
    changeOrigin: true
  });
});

server.listen(8080, () => {
  console.log(`Bridge is running and pointing to ${target}`);
});
