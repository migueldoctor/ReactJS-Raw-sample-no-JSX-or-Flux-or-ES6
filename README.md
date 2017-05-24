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

### 3. Using Javascript functions (map, filter) and instructions to create custom html content using React.createElement()
Since React.createElement is just plain javascript, you can use it in loops, if statements or any other feature provided by javascript language.

In commit [7](https://github.com/migueldoctor/ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6-/commit/268b256ab3644618278ad7ef105a2805c35d77ec) you can see how to create a list in html with an array of contacts, applying map and filter javascript functions over it and returning and React element.

We can store the data into an array
```javascript
var contacts = [
            {key: 1, name: "James Nelson", email: "james@jamesknelson.com"},
            {key: 2, name: "Bob"},
            {key: 3, name: "Miguel", email:"mikydoc_sev@hotmail.com"}
      ]
 ```
 
Apply javascript functions over it (like map and filter...) and return a react element
```javascript
var getEmailFromContact = function(contact) { return contact.email; }
var listElements = contacts.filter(getEmailFromContact)
                                 .map(function(contact) {
                                          return React.createElement('li', {key: contact.key},
                                                      React.createElement('h2', {}, contact.name),
                                                      React.createElement('a', {href: 'mailto:'+contact.email}, contact.email))
                                                      
                        });
```

Then we can use that into our root React.createElement function

```javascript
var rootElement = React.createElement('div',{},
        React.createElement('h1',{},"Contacts"),
         React.createElement('ul', {}, listElements) 
                 );
 ReactDOM.render(rootElement, document.getElementById('react-app'));
  ```
