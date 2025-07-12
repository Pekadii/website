const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // for index.html

app.post('/send', (req, res) => {
  const { ps4ip, pkgurl } = req.body;
  const options = {
    hostname: ps4ip,
    port: 12800,
    path: '/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const request = http.request(options, response => {
    response.setEncoding('utf8');
    let body = '';
    response.on('data', chunk => body += chunk);
    response.on('end', () => res.send(`✅ Sent to PS4: ${body}`));
  });

  request.on('error', err => {
    res.send(`❌ Failed: ${err.message}`);
  });

  request.write(JSON.stringify({ type: "direct", url: pkgurl }));
  request.end();
});

app.listen(PORT, () => {
  console.log(`🌐 PKG Sender running on http://localhost:${PORT}`);
});
