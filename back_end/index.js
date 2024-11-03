const express = require('express');
const app = express();
const port = 8080
const routes = require('./routes');
const cors = require('cors');



// Allow all origins
app.use(cors()); 

// Middleware để parse Json
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Static files
app.use('/uploads', express.static('uploads'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Run All Routes
routes(app);

// Port :3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})