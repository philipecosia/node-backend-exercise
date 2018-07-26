// Setup
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var router = express.Router();

// Routing
router.get('/', (req, res) => {
    res.status(200);
    res.type('text/html');
    res.send(
        'Your language is: ' 
        + req.headers["accept-language"] 
        + '<br /> You sent a: ' 
        + req.method 
        + ' request');
});

router.post('/', (req, res) => {
    res.status(200);
    if (req.query.postVar) {
        res.type('text/html');
        res.send('Your POST variable value: ' + req.query.postVar);        
    } else {
        res.type('text/html');
        res.send('Please specify a postVar variable.');
    }
});

// Error handling
router.get('*', (req, res) => {
   res.status(404);
   res.send('Not found');
});

router.all('*', (req, res) => {
    res.status(405);
    res.send('Method not allowed');
 });

// Register routing
app.use(router);

// Start the server
app.listen(port);