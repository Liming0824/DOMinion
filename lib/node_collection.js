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
