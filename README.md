# ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6-
Step by Step tutorial about how to use ReactJS without any other react ecosystem tool like JSX or Webpack or ES6 or Redux...

### 1. Setting up the environment
The 2 first commit operations describe the way to import react and react-dom libraries into a html document
```javascript 
 <script src="https://cdn.jsdelivr.net/react/15.5.4/react.js"></script>
 <script src="https://cdn.jsdelivr.net/react/15.5.4/react-dom.js"></script>
```   

### 2. Using the React.createElement() function to render html content from Reactjs
Commit [3](https://github.com/migueldoctor/ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6-/tree/c36accf9bbdbaf4f1bdb97e0a5c3704b9ed1e3ce
) shows how to create div and h1 elements with React.createElement()

```javascript
var rootElement = React.createElement('div',{},
        React.createElement('h1',{},"Contacts"));
```
Commit [4](https://github.com/migueldoctor/ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6-/commit/a031d2e56a863ca4b62a992aaf90209cc992449e) shows how to use React.createElement() with attributes like element a with attribute href


```javascript
  React.createElement('a', {href: 'mailto:james@jamesknelson.com'}, 'james@jamesknelson.com')
```
