const express = require('express');
const port = 8080;
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const setupSocket = require('./socket/socket.js')
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);


// Allow all origins
app.use(cors());

// Middleware để xử lý body (JSON)
app.use(bodyParser.json());

// Static files
app.use('/uploads', express.static('uploads'));



// Thiết lập Socket.IO
setupSocket(server);
// Run All Routes
routes(app);
// Port :3000
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
