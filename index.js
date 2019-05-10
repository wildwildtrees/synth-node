var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
 
app.use(function (req, res, next) {
  console.log('middleware');
  req.testing = 'testing';
  return next();
});
 
app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  //res.end();
  res.sendFile(__dirname + '/synth.html');
});

app.get('/Tone.js', function(req, res, next){
  console.log('get route', req.testing);
  //res.end();
  res.sendFile(__dirname + '/Tone.js');
});
 
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(msg);
  });
  console.log('socket', req.testing);
});

/*
app.ws('/echo', function(ws, req) {
    ws.on('message', function(msg) {
      ws.send(msg);
    });
  });
*/

  app.ws('/music', function(ws, req) {
    ws.chatter = true ; 
    ws.on('message', function(msg) {
      expressWs.getWss().clients.forEach(client => { 
        if (client.chatter) { client.send(msg)} ;
      });
    });
  });

app.listen(3000);