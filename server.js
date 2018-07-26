const http = require('http');
const url = require('url');

http.createServer((request, response) => {
    
    const parsed = url.parse(request.url, true);
    const pathName = parsed.pathname;

    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });
    
    response.on('error', (err) => {
        console.error(err);
    });
    
    if (request.method === 'POST' && pathName === '/') {     
        
        if (parsed.query.postVar) {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            response.write(
                'Your POST variable value: '
                + parsed.query.postVar
            );
            response.end();
        } else {
            response.statusCode = 400;
            response.setHeader('Content-Type', 'text/html; charset=utf-8');
            response.write('Please specify a postVar variable.');
            response.end();
        }
    
    } else if (request.method === 'GET' && pathName === '/') {
        
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.write(
            'Your language is: '
            + request.headers['accept-language'] +
            '<br /> You sent a: '
            + request.method
        );
        response.end();
   
    } else if (request.method !== 'GET' && request.method !== 'POST' ) {
    
        response.statusCode = 405;
        response.end();
    
    } else {
   
        response.statusCode = 404;
        response.end();
    
    }

}).listen(8000);