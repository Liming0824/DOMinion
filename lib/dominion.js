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

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
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
    this.nodeArr.forEach(node => node.innerHTML = '');
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

  addClass(classname){
    this.nodeArr.forEach(el => {
      el.classList.add(classname);
    });
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
    this.nodeArr = [];
  }

  append(children){

    if(this.nodeArr.length === 0){
      return ;
    }

    if(typeof children === 'object' && !(children instanceof DomNodeCollection)){
      children = $l(children);
    }

    if(typeof children === 'string'){
      this.nodeArr.forEach(el => {
        el.innerHTML += children;
      });
    }else if (children instanceof DomNodeCollection){
      this.nodeArr.forEach(node => {
        children.nodeArr.forEach( childNode => {
          node.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  children(){
    let arr = [];
    this.nodeArr.forEach(node => {
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


/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ "./lib/dom_node_collection.js");
let _docCallbacks = [];
let _docReady = false;

const DICTIONARY = {apple:{src: "assets/images/Apple.png", chinese: '苹果'},
                    banana: {src:"assets/images/banana.png",chinese: '香蕉'},
                    carrot: {src: "assets/images/carrot.png", chinese: '胡萝卜'},
                    cucumber: {src: "assets/images/cucumber.jpg", chinese: '黄瓜'},
                    grape: {src: "assets/images/grape.png", chinese: '葡萄'},
                    orange: {src: "assets/images/orange.png", chinese: '橙子'},
                    pumpkin: {src: "assets/images/pumpkin.png", chinese: '南瓜'},
                    tomato: {src: "assets/images/tomato.png", chinese: '西红柿'},
                    watermelon: {src: "assets/images/watermelon.png", chinese: '西瓜'},
                    dragonfruit: {src: "assets/images/Dragonfruit.png", chinese: '火龙果'},
                    lemon: {src: "assets/images/Lemon.png", chinese: '柠檬'},
                  };

window.$l = (arg) => {
  switch(typeof arg){
    case 'string':
      return getNodesFromDom(arg);
    case 'function':
      return registerCallback(arg);
    case 'object':
      return new DOMNodeCollection([arg]);
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
    request.send(JSON.stringify(options.data));
  });
};


function shuffle(arr){
  let arr2 = new Array(arr.length);
  for(let i = 0; i < arr.length; i++ ){
    arr2[i] = arr[i];
  }
  for(let j = arr.length - 1; j > 0; j-- ){
    let x = Math.floor(Math.random()*(arr.length - j));
    const num = arr2[x];
    arr2[x] = arr2[j];
    arr2[j] = num;
  }
  return arr2;
}


function compare(arr1, arr2){
  let count = 0;
  for(let i = 0; i< arr1.length; i++){
    if(arr1[i]===arr2[i]){
      count += 1;
    }
  }
  return count;
}

function gameover(arr){
  for(let i = 0; i < arr.length; i++){
    if(arr[i].nodeArr.length !== 0){
      return false;
    }
  }
  return true;
}




function game(){

  let foodPic = $l('.food-pic');
  foodPic.empty();
  let foodArr = shuffle(Object.keys(DICTIONARY)).slice(0, 5);
  let foodTranslateList = $l('.food-translate');
  foodTranslateList.empty();
  window.foodNodes = new Array(foodArr.length);

  let overPage = $l('container');
  overPage.removeClass('over-page');
  score = $l('strong');
  score.empty();

  foodArr.forEach((food, idx) => {
    const subNode = `<div class="subNode"><img class="${food}-image" src="${DICTIONARY[food].src}"/><i>${food}</i></div>`;
    let node = document.createElement("div");

    node.id = `${idx}-choice`;
    node = $l(node);
    node.append(subNode);
    foodPic.append(node);
  });

  let answerArray = [];
  let choiceArray = shuffle(foodArr);
  let num = 0;



  function makeChoice(food, idx){
    let node = document.createElement("p");
    node.innerHTML = `<span>${DICTIONARY[food].chinese}</span>`;
    node.className = `${food}-translate`;
    foodTranslateList.append(node);

    window.foodNodes[idx] = $l(`.${food}-translate`);
    window.foodNodes[idx].on('click', ()=>{
      answerArray.push(food);
      let subAnswer = document.createElement("p");
      subAnswer.innerHTML = `<span>${DICTIONARY[food].chinese}</span>`;
      subAnswer = $l(subAnswer);
      let answer = document.getElementById(`${num}-choice`);
      answer = $l(answer);
      subAnswer.addClass('checked');
      answer.append(subAnswer);
      num += 1;
      window.foodNodes[idx].remove();
      if(gameover(window.foodNodes)){
        const count = compare(foodArr, answerArray);
        overPage.addClass('over-page');
        if(count === 5){
          score.html(`You Win !`);
        }else{
          score.html(`Your Score is ${count}`);
        }
      }
    });

  }


  choiceArray.forEach((food, idx) => makeChoice(food, idx));

}








document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docCallbacks.forEach(callback => callback());

  game();
  document.querySelectorAll('button')[0].addEventListener('click', ()=>{
    game();
  });

});


/***/ })

/******/ });
//# sourceMappingURL=dominion.js.map