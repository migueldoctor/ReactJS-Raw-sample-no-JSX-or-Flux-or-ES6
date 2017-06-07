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
### 4.  Moving js code from the html file to an external js file (main.js) 
In commit [10](https://github.com/migueldoctor/ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6-/commit/a4e20ad2e9acc297cf8bb14489ea4fbbf05fdcd2) we have refactored the source code in order to separate the JS code and the html code. In consequence we have created a new file called main.js and place on it all js code we previously had within a script tag in the index.html file.

Once removed the js code from the html file, we have to reference it AFTER the div block where the react code will be rendered

```javascript
 <body>
    <!-- 1) This is the DIV where the react app will be rendered -->
    <div id="react-app">
    </div>
    
    <!-- 2) here these two lines import the react.js and react-dom.js libraries -->
    <script src="https://cdn.jsdelivr.net/react/15.5.4/react.js"></script>
    <script src="https://cdn.jsdelivr.net/react/15.5.4/react-dom.js"></script>
    
    <!-- 3) here the file main.js with the reactjs code will be executed  -->
    <script src="main.js"></script>

  </body>
```

### 5.  Using React.createClass() to create your own components
So far we are using react just to create HTML components by making use of Javascript. But the real power of React comes with the posibility of create your own components so you can use it as regular HTML components on your reactjs source files. Reactjs defines new components by invoking the method React.createClass(). When using this method you have to define the following properties:

1. propTypes: (This is optional but recommendable for testing purposes) Here you can define the attributes of your new component (just like the href attribute of the a HTML component)
2. render: This is mandatory and it is a function returing what needs to be rendered when this component is used on a reactjs program.

Let's see an example of using React.createClass method:

```javascript
// Custom components must start with upper letter
var SampleItem = React.createClass({
        propTypes: {
                //This attributes will be available from render function under this.props.name and this.props.email
                name: React.PropTypes.string.isRequired,
                email: React.PropTypes.string, //This one is not mandatory
        },
        
        render: function() {
                return (
                        React.createElement('li', {},
                                React.createElement('h2', {}, this.props.name),
                                React.createElement('a', {href: 'mailto:'+this.props.email}, this.props.email)
                                )
                    )
        }
});
```

Once created you can use it with React.createElement() method as you would do with any other standard HTML component. ONLY ONE DIFERENCE: when invoking createElement() method the the name of your component has no quotes (')

```javascript

var rootElement = React.createElement(SampleItem, 
                            {
                            name:'Miguel Doctor',
                            email:'fakeemail@mail.com'
                            }
                        );
                        
//var rootElement = React.createElement(SampleItem, {name:'Miguel Doctor'});
ReactDOM.render(rootElement, document.getElementById('react-app'))
```

### 6.  Refactor your code by Creating a ContactItem component with React.createClass()
In the previous section we described how to use createClass method to create your component. Now In commit [13](https://github.com/migueldoctor/ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6-/commit/8e1e619f98381bfd7403c5dd4201ef7f6861176b) we can see how to apply that to our example.

1. We update the contacts array by adding description field to some of the stored objects.

```javascript
var contacts = [
    {key: 1, name: "Fake user", email: "fakeemail@mail.com", description: "This is a fake user to make the sample"},
    {key: 2, name: "Bob", description:"Bob is a great user but without email, so he will be filtered out"},
    {key: 3, name: "Miguel", email:"MiguelfakeEmail@mail.com"}
    ]
```

2. We create the component ContactItem by useing React.createClass method

```javascript
//2) We create the React Component ContactItem
var ContactItem = React.createClass({
    propTypes: { // The passed argument must be an object with name, email and description fields being name mandatory
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string,
        description: React.PropTypes.string,
    },

    render: function() {
        return (
            React.createElement('li',{}, // We create an list element and we print the name, the email and the description using several html tags
                React.createElement('h2',{},this.props.name),
                React.createElement('a',{href:'mailto:'+this.props.email}, this.props.email),
                React.createElement('div',{},this.props.description)
            )
        );
    }
});

```

3. We invoke the component ContactItem by using React.createElement method (Remember not to use quotes ' )

```javascript
//3) Then we apply the filter and for each element in the array (contact), we return the element ContactItem just defined
var getEmailFromContact = function(contact) { return contact.email; }
var listElements = contacts.filter(getEmailFromContact)
                           .map(function(contact) {
                                          return React.createElement(ContactItem,contact); // HERE You can see that the argument of ContactItem 
                                                                                           // must be an object with name, description and email
                        });
```

### 7.  Rendering changes in React with ReactDOM.render()

React doesn't include any kind of automatically-updating views mechanism, so the developer must to indicate react when to make a re-render of the displayed data.
In short, React makes use of a shadow DOM tree, and changes are done on that shadow DOM tree. So when we recall a ReactDOM.render(), React compares the displayed real DOM
tree with the shadow one, and it updates ONLY the elements that have been updated. That is why react is so efficient.

In order to decide what to change, React  uses a number of rules to decide what to do:

  1. ReactElements with differing types are trashed and re-rendered
  2. ReactElements with differing props or children are re-rendered in place
  3. Identical ReactElements which have been re-ordered within an array are moved to reflect the new order

When React encounters an array of ReactElements with identical type and props, despite looking identical from the outside it cannot know that they are really identical. This is because elements can have internal state – for example, whether the element currently has user focus. This becomes a problem when React goes to re-render those elements, as it cannot tell one from another – and thus doesn’t know if their order within the array has changed.

This is where the key property from the earlier examples comes in. It lets React distinguish between elements, and keep the DOM aligned with our ReactElement tree. You don't need to indicate this key property in your component React, you just need to add it as field in the array object.

### 8.  Forms in React
In React, input elements are not complicated at all. The _value_ is taken as a prop, and this is what will be displayed. It's very important to mention that since *the component can’t directly change the props* (as the values passed in from the outside world) user input won’t cause any change in the displayed value. Therefore you will need to set up events handlers in order to process the user inputs and modify your UI accordingly.
In addition to value, input elements take the props you’d expect them to. With a few minor exceptions, the attributes you can pass to a HTML \<input> are also available as props. There are two exceptions worth keeping in mind:

   1. React textarea elements take their content as a value prop, not as children
   2. The HTML for attribute is bound to the __*htmlFor*__ prop (as for is a reserved word in JavaScript)

In commit [22](https://github.com/migueldoctor/ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6-/commit/521b0d259d7e5c7c133b4f7269588dbcc6c4694e) we have implemented the form to add contacts to our react app following the 3 steps indicated below:
  
   1. Creation of the component ContactForm by using React.createClass()
   
   ```javascript
        // 1) Here we create the ContactForm react component which will receive a contact object as passed prop argument
        var ContactForm = React.createClass({
        propTypes: {
                contact: React.PropTypes.object.isRequired
        },

        render: function(){
                return ( 
                   React.createElement('form', {},
                        React.createElement('input',{
                                type:'text',
                                placeholder: 'Name (required)',
                                value: this.props.contact.name
                        }),
                        React.createElement('input',{
                                type:'text',
                                placeholder: 'Email (optional)',
                                value: this.props.contact.email
                        }),
                        React.createElement('textarea',{
                                placeholder: 'Description (optional)',
                                value: this.props.contact.description
                        }),
                        React.createElement('button', {type: 'submit'}, "Add Contact")
                    )
              )
        }
        });
   ```
   
   2. Initialize a var containing an empty contact object
   ```javascript
        //2) Then we create a new empty contact object
        var newContact = {name: "", email: "", description: ""}
   ```

   3. Added the component ContactForm to our rootElement
   ```javascript

        //3) Finally we add the ContactForm component to our rootElement component
        var rootElement = React.createElement('div',{},
                                    React.createElement('h1',{},"Contacts"),
                                                React.createElement('ul', {}, listElements),
                                                React.createElement(ContactForm, {contact:newContact})
                                    );
 ```
 
 
 ### 9.  Styling React apps by using className React attribute

In React, we can assign class attributes to the components by using the property className (Note that like the DOM, React uses the className property to assign CSS classes (as class is a reserved word in JavaScript). There are several methods to assign css styles to our components, but for simplicity on this example we are going to pass them directly to the render function of the component.

1. So let's start by assigning the property className to the ContactItem components. As follows we can see the *stylized* version of the ContactItem render function:

 ```javascript
        render: function() {
                return (
                React.createElement('li',{className: 'ContactItem'}, //Adding the className property with ContactItem css class
                        React.createElement('h2',{className: 'ContactItem-name'},this.props.name),
                        React.createElement('a',{className: 'ContactItem-email', href:'mailto:'+this.props.email}, this.props.email),
                        React.createElement('div',{className: 'ContactItem-description'},this.props.description)
                        )
                );
        }
 ```

 The next step would be to create a css file (style.css) including the definition of the used css classes (ContactItem, ContactItem-nmae, ContactItem-email and ContactItem-description). This file needs to be referenced in the head of your index.html file as indicated below
 ```html
         <link rel="stylesheet" href="style.css">
 
 ```

 ```css

        body {
        font-family: Tahoma, sans-serif;
        margin: 0;
        }
        .ContactItem {
        margin: 0;
        padding: 8px 24px;
        border-bottom: 1px solid #f0f0f0;
        }
        .ContactItem-name {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
        }
        .ContactItem-email {
        font-size: 14px;
        margin-top: 4px;
        font-style: italic;
        color: #888;
        }
        .ContactItem-description {
        font-size: 14px;
        margin-top: 4px;
        }

 ```

 2. Now we continue stylizing the other component ContactForm:

```javascript
      render: function() {
                return (
                     React.createElement('form', {className: 'ContactForm'}, // Add ContactForm CSS className
                        React.createElement('input', {
                        (....)
```
    The proper rules need to be added to the style.css. It's indicated as follows.

```css
        .ContactForm {
                 padding: 8px 24px;
                }
         .ContactForm > input,
         .ContactForm > textarea {
                 display: block;
                 width: 240px;
                 padding: 4px 8px;
                 margin-bottom: 8px;
                 border-radius: 3px;
                 border: 1px solid #888;
                 font-size: 14px;
          }
```
3. Finally in order to keep more reusible our react script we are going to create a ContactView component that receives the list of contacts as well as the new contact used to store the input data. It will make use of the *ContactForm* and *ContactItem* components. As follows the code and the CSS associated views.

 ```javascript
        var ContactView = React.createClass({
                propTypes: {
                        contacts: React.PropTypes.array.isRequired,
                        newContact: React.PropTypes.object.isRequired,
                },

                render: function() {
                        var getEmailFromContact = function(contact) { return contact.email };
                        var contactItemElements = contacts.filter(getEmailFromContact)
                                                          .map(function(contact) {
                                                                        return React.createElement(ContactItem,this.props.newContact); // Here we use this.props.newContact
                                                                        }
                                                                );

                        return (
                                React.createElement('div', {className: 'ContactView'},
                                        React.createElement('h1', {className: 'ContactView-title'}, "Contacts"),
                                        React.createElement('ul', {className: 'ContactView-list'}, contactItemElements),
                                        React.createElement(ContactForm, {contact: this.props.newContact})
                                        )
                                )
                }
        });
```

```css

        .ContactView-title {
        font-size: 24px;
        padding: 0 24px;
        }

        .ContactView-list {
        list-style: none;
        margin: 0;
        padding: 0;
        border-top: 1px solid #f0f0f0;
        }

```
4. Finally we render the ContactView component as root component of the react application. 

```javascript
        /*
        * Entry point
        */

        ReactDOM.render(
                React.createElement(ContactView, {contacts: contacts,newContact: newContact}),
                document.getElementById('react-app')
        )
```

In commit [24] (https://github.com/migueldoctor/ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6-/commit/e9b64407d9537d7d88327c67396a8ece2bfd66e8) you can see the result of these changes.
