/**
 * Created by tcstory on 4/25/16.
 */
"use strict";

var express = require('express');
var app = express();

app.get('/success', function (req, res) {
    cros(res);
    res.send({
        x: 1
    })
});
app.delete('/success', function (req, res) {
    cros(res);
    res.send({
        x: 1
    })
});
app.get('/error', function (req, res) {
    cros(res);
    throw new Error('error');
});
app.get('/timeout', function (req, res) {
    cros(res);
    setTimeout(function () {
        console.log('timeout');
        res.send('timeout')
    }, 8000)
});

app.post('/form', function (req, res) {
    cros(res);
    res.send({
        x:1
    });
    // res.send('123');
});

app.options('/*?', function (req, res) {
    cros(res);
    res.send()
});

app.listen(9999);


function cros(res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
}