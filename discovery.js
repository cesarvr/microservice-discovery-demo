'use strict';

const dns = require('dns');

function toServiceNotation(name){
  return name.replace(/-|\s/g, '_');
}

function searchInEnvVars(_name){
  let evars = process.env;
  let svcName = toServiceNotation(_name).toUpperCase().trim();

  let service = evars[svcName + '_SERVICE_HOST'];
  let port = evars[svcName + '_SERVICE_PORT'];

  return {service:service, port: port};
}

function searchInDNS(_name){
  return new Promise((resolve, reject) => {
    let service =dns.lookup(_name, (err, addr, family) => {
        if(err) reject(err);
        resolve(addr);
    });
  });
}

// @Experimental
function searchInDNSSRV(_name){
  return new Promise((resolve, reject) => {
    let service =dns.resolveSrv(_name, (err, addr, family) => {
        if(err) reject(err);
        resolve(addr);
    });
  });
}

function whoami(){
 return new Promise( (resolve, reject) => {
    dns.lookupService('127.0.0.1', 80, (err, hostname, svc)=>{
      if(err) reject(err);
      resolve({name: hostname, info: searchInEnvVars(hostname) });
    })
 });
}

/*
function getService(name){
  return searchInEnvVars(name)
}
*/

module.exports = {
  toServiceNotation: toServiceNotation,
  searchInEnvVars: searchInEnvVars,
  //getService: getService,
  searchInDNS: searchInDNS,
  searchInDNSSRV: searchInDNSSRV,
  whoami: whoami
};
