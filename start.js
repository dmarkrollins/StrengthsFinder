
var express = require('express');
var app = express();
var http = require('http');
var httpServer = http.Server(app);

app.use(express.static(__dirname));

app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});
app.listen(3000);

console.log('App listening at http://localhost:3000');
