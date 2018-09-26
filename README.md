## DOMinion
DOMinion is a JavaScript DOM interaction library inspired by jQuery.
* Select single or multiple DOM elements
* Traverse DOM elements
* Queue functions until DOM is fully loaded

## Geting Started
The way to use DOMinion is to download this library into your project, and use
the webpack output `dominion.js` as one of your source code.

  ```javascript
  <script type="text/javascript" src="./lib/dominion.js" charset="utf-8"></script>
  ```
  
  ## API
  `$l`
  # DOM Traversal
  * `children`
  * `parent`
  # DOM Manipulation
  * `html`
  * `empty`
  * `append`
  * `remove`
  * `attr`
  * `addClass`
  * `removeClass`
  # Event Listener
  * `on`
  * `off`
  `$l.extend`
  `$l.ajax`
  
  ## $l
  The DOMinion library uses the global variable `$l` as a wrapper.
  `$l` is commonly used as a CSS selector, when user pass an string as the argunment `$l('div')`.
  The return value will be a DOMNodeCollection object which is an array of `HTMLElement`s.
  
  `$l` could be able to create `DOMNodeCollection` objects from unwrapped `HTMLElement`s.
  
  `$l` could also take functions and run the functions after the document has be fully loaded.
  
  ## DOM Traversal 
  Navigate DOM elements by using `DOMNodeCollection` methods.
  
  `children`
  Return a `DOMNodeCollection` of all children of all nodes in the `DOMNodeCollection` object.
  
  `parent`
  Return a `DOMNodeCollection` of the parents of each of the nodes.
  
  ## DOM Manipulation
  
  `html`
  If it receives an argument, return value will be a `DOMNodeCollection` includes innerHTML of the each of the nodes. 
  If it does not receive an argument, it will return the innerHTML of the first node in the `DOMNodeCollection`.
  
  `empty`
  This method clears out the content of all nodes in the `DOMNodeCollection` object.
  
  `append`
  This method could accept either a `DOMNodeCollection` object, an HTML element, or a string, and appends it 
  to each element of the 'DOMNodeCollection` object.
  
  `remove`
  Remove each `DOMNodeCollection` element from the DOM.
  
  `attr`
  Take either one argument or two arguments. If given one argunment, the method gets the value of the attribute given 
  for the first element of the `DOMNodeCollection` object. If given two argunments, the method sets value(second argunment)
  to the attribute(first argunment).
  
  `addClass`
  Adds a class, given as an argument, to each DOMNodeCollection element.
  
  'removeClass`
  Removes a class, given as an argument, from each DOMNodeCollection element.

## Event Listeners
 
 `on`
 Adds event listener to each DOMNodeCollection element.
 
 `off`
 Removes event listener from each DOMNodeCollection element.
 
 ## $l.ajax
 
 Accepts a object as an argunment, sends XMLHttpRequest, and return Promise object.
 default argunment is as below:
 
```javascript
   const defaults = {
      method: 'GET',
      url: '',
      data: {},
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      success: () => {},
      error: () => {}
    };
 ```
  
  
  
  
  
  
  
  
  
  
