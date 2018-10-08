const DOMNodeCollection = require("./dom_node_collection");
let _docCallbacks = [];
let _docReady = false;

window.$l = (arg) => {
  switch(typeof arg){
    case 'string':
      return getNodesFromDom(arg);
    case 'function':
      return registerCallback(arg);
    case 'object':
      return DomNodeCollection([arg]);
  }
};

getNodesFromDom = (arg) => {
  const nodes = document.querySelectorAll(arg);
  const nodesArr = Array.from(nodes);
  return new DOMNodeCollection(nodesArr);
};

registerCallback = (func) => {
  if(_docReady){
    func();
  }else{
    _docCallbacks.push(func);
  }
};

$l.extend = (base, ...otherObjects) => {
  otherObjects.forEach(obj => {
    for(const attr in obj){
      base[attr] = obj[attr];
    }
  });
  return base;
};

queryData = (data) => {
  let value = '';
  for(const attr in data){
    if(data.hasOwnProperty(attr)){
      value += attr + '=' + data[attr] + '&';
    }
  }
  return value.slice(0, -1);
};

$l.ajax = (options) => {
  return new Promise(function(resolve, reject){
    const request = new XMLHttpRequest();
    const defaults = {
      method: 'GET',
      url: '',
      data: {},
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: () => {},
      error: () => {}
    };
    options = $l.extend(defaults, options);
    options.method = options.method.toUpperCase();
    if(options.method === 'GET'){
      options.url += '?';
      options.url += queryData(options.data);
    }

    request.open(options.method, options.url, true);
    request.onload = (e) => {
      if(request.status === 200){
        options.success(request.response);
        resolve(request.response);
      }else{
        options.error(request.response);
        reject(request.response);
      }
    };
    request.send(JSON.stringify(options.data))
  });
};









document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docCallbacks.forEach(callback => callback());
});
