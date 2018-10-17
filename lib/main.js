const DOMNodeCollection = require("./dom_node_collection");
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

  let foodPic = window.$l('.food-pic');
  foodPic.empty();
  let foodArr = shuffle(Object.keys(DICTIONARY)).slice(0, 5);
  // translate choices
  let foodTranslateList = window.$l('.food-translate');
  foodTranslateList.empty();
  window.foodNodes = new Array(foodArr.length);

  let overPage = window.$l('container');
  overPage.removeClass('over-page');
  score = window.$l('strong');
  score.empty();



  foodArr.forEach((food, idx) => {
    const subNode = `<div class="subNode"><img class="${food}-image" src="${DICTIONARY[food].src}"/><i>${food}</i></div>`;
    let node = document.createElement("div");

    node.id = `${idx}-choice`;
    node = window.$l(node);
    node.append(subNode);
    foodPic.append(node);
  });

  let answerArray = [];
  let choiceArray = shuffle(foodArr);
  let num = 0;

  choiceArray.forEach((food, idx) => {

    let node = document.createElement("p");
    node.innerHTML = `<span>${DICTIONARY[food].chinese}</span>`;
    node.className = `${food}-translate`;
    foodTranslateList.append(node);

    window.foodNodes[idx] = window.$l(`.${food}-translate`);
    window.foodNodes[idx].on('click', ()=>{
      answerArray.push(food);
      let subAnswer = document.createElement("p");
      subAnswer.innerHTML = `<span>${DICTIONARY[food].chinese}</span>`;
      subAnswer = window.$l(subAnswer);
      let answer = document.getElementById(`${num}-choice`);
      answer = window.$l(answer);
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
  });

}




document.addEventListener('DOMContentLoaded', () => {
  _docReady = true;
  _docCallbacks.forEach(callback => callback());

  game();
  document.querySelectorAll('button')[0].addEventListener('click', ()=>{
    game();
  });

});
