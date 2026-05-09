const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
// اگر سرور مقصد شما SSL دارد، حتماً از https:// استفاده کنید
const target = process.env.TARGET_DOMAIN || 'a1.appleid.asia:2086';

const server = http.createServer((req, res) => {
  proxy.web(req, res, { 
    target: `https://${target}`, // تغییر از http به https
    changeOrigin: true,
    secure: false // این گزینه اجازه می‌دهد حتی اگر گواهی مقصد معتبر نبود، ارتباط برقرار شود
  });
});

proxy.on('error', (err, req, res) => {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Proxy Error');
});

server.listen(8080);
