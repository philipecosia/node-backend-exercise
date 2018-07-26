const http = require('http');
const url = require('url');

http.createServer((request, response) => {
    
    const parsed = url.parse(request.url, true);
    const pathName = parsed.pathname;

    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end('<html><body>Dang sorry!</body></html>');
    });
    
    response.on('error', (err) => {
        console.error(err);
    });
    
    if (request.method === 'POST' && pathName === '/') {     
        
        if (parsed.query.postVar) {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            response.write('<html><body>');
            response.write(
                'Your POST variable value: '
                + parsed.query.postVar
            );
            response.write('</body></html>');
            response.end();
        } else {
            response.statusCode = 400;
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            response.write('<html><body>');
            response.write('Please specify a postVar variable.');
            response.write('</body></html>');
            response.end();
        }
    
    } else if (request.method === 'GET' && pathName === '/') {
        
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.write('<html><body>');
        response.write(
            'Your language is: '
            + request.headers['accept-language'] +
            '<br /> You sent a: '
            + request.method
        );
        response.write('</body></html>');
        response.end();
   
    } else if (request.method !== 'GET' && request.method !== 'POST' ) {
    
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.statusCode = 405;
        response.end('<html><body>HTTP method not supported</body></html>');
    
    } else {
   
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.statusCode = 404;
        response.end('<html><body>Not found</body></html>');
    
    }

}).listen(8000);