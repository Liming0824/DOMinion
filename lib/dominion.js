/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const NodeCollection = __webpack_require__(/*! ./node_collection */ "./lib/node_collection.js");
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
  return new NodeCollection(nodesArr);
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
  return value.slice(0, -1)
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


/***/ }),

/***/ "./lib/node_collection.js":
/*!********************************!*\
  !*** ./lib/node_collection.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

class DomNodeCollection {

  constructor(nodeArr){
    this.nodeArr = nodeArr;
  }

  html(arg){
    if(typeof arg === 'string'){
      this.nodeArr.forEach(node => {
        node.innerHTML = arg;
      });
    }else if(this.nodeArr.length > 0){
      return the.nodeArr[0].innerHTML;
    }
  }

  empty(){
    this.nodeArr.innerHTML = '';
  }

  attr(attribute, value){
    if(typeof value === 'undefined'){
      let arr = [];
      this.nodeArr.forEach(el => {
        arr.push(el.getAttribute(attribute));
      });
    }else{
      this.nodeArr.forEach(el => {
        el.setAttribute(attribute, value);
      });
    }
  }

  addClass(value){
    this.attr('class', value);
  }

  removeClass(className){
    this.nodeArr.forEach(node => {
      node.classList.remove(className);
    });
  }

  remove(){
    this.nodeArr.forEach(node => {
      node.innerHTML = '';
      node.outerHTML = '';
    });
    this.array = [];
  }

  append(children){

    if(this.nodeArr.length === 0){
      return ;
    }

    if(typeof children === 'object' && !(children instanceof DomNodeCollection)){
      children = $l(children);
    }

    if(typeof children === 'string'){
      this.array.forEach(el => {
        el.innerHTML += children;
      });
    }else if (children instanceof DomNodeCollection){
      this.nodeArr.each(node => {
        children.each( childNode => {
          node.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  children(){
    let arr = [];
    this.nodeArr.each(node => {
      const childNodes = node.children;
      arr = arr.concat(Array.from(childNodes));
    });
    return new DomNodeCollection(arr);
  }

  parent(){
    let arr = [];
    this.nodeArr.forEach((el) => {
      if(!arr.includes(el.parentNode)){
        arr.push(el.parentNode);
      }
    });
    return new DomNodeCollection(arr);
  }

  find(selector){
    let arr = [];

    this.array.forEach( (node) => {
        arr = arr.concat(Array.from(node.querySelectorAll(selector)));
      }
    );
    return new DOMNodeCollection(arr);
  }

  on(action, callback){
    this.nodeArr.forEach(node => {
      node.addEventListener(action, callback);
      const eventKey = `jQuery-${action}`;
      if(typeof node[eventKey] === 'undefined'){
        node[eventKey] = [];
      }

      node[eventKey].push(callback);
    });
  }

  off(action){
    this.nodeArr.forEach( node => {
      const eventKey = `jQuery-${action}`;
      node[eventKey].forEach(callback => {
        node.removeEventListener(action, callback);
      });
      node[eventKey] = [];
    });
  }

}


module.exports = DomNodeCollection;


/***/ })

/******/ });
//# sourceMappingURL=jquery_lite.js.map