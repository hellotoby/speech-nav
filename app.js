"use strict";

var express         = require('express'),
    app             = express(),
    staticFiles     = require('express-static');

var port = process.env.PORT || 8000;

app.use("/css", staticFiles(__dirname + '/css'));
app.use("/js", staticFiles(__dirname + '/js'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', function(req, res) {
    res.sendFile(__dirname + '/about.html');
});

app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/contact.html');
});

app.listen(port);