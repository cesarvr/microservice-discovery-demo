'use strict';
let express = require('express');
let discovery = require('./discovery');


const PORT = 8080;
const HOST = '0.0.0.0';
let app = express();

app.use('/', express.static(__dirname + '/static'));

app.use('/whoami', (req, resp, next)=>{
  console.log('whoami->');
 discovery.whoami().then( (h)=> resp.status(200).send(h) ).catch( (e)=> req.status(500).send(e) );
});

app.use('/discover', (req, resp, next)=>{
  console.log('req.params', req.query, 'req.body->', req.body);

  let svcName = req.query.service;
  let rsp = {};

  rsp.env = discovery.searchInEnvVars(svcName);

  discovery.searchInDNS(svcName)
  .then(addr=>rsp.dns=addr)
  .then(()=>{
    discovery.searchInDNSServ(svcName).then((addr)=>{
       rsp.srv=JSON.stringify(addr);
       resp.status(200).send(rsp);
     });
  }).catch(()=> resp.status(200).send(rsp) );

});

app.listen(PORT, HOST, function() {
    console.log("Server [" + HOST + "] started At: " + new Date() + "  on port: " + PORT);
});
