#Autodiscovery module for microservices (DEMO).

Quick demo showcasing the Node.js Microservice discovery API for Openshift.

![](https://github.com/cesarvr/microservice-discovery-demo/blob/master/docs/captura.PNG)


Just add this project using a your favourite Node4 ImageBuilder template, and you will be able to find nearby services, in this example use the discovery API to discovery connection details of the Mongodb pod.


## Features

- Discovery through environment variables.
  - Look for surrounding services looking at environment variables.
- DNS Lookup
  - You can discover services that are in your same network/project in OSE3/Kubernetes.
- DNS SRV
  - Looking for services using this more robust [DNS specification](https://en.wikipedia.org/wiki/SRV_record).

## More info

- [Openshift 3.x](https://docs.openshift.com/enterprise/3.0/getting_started/index.html)
- [Kubernetes](http://kubernetes.io/docs/user-guide/servicesSS)
