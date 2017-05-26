//  Since React.createElement is just plain javascript, you can use it in loops,
//  if statements or any other feature provided by javascript

//  Let us create an array JSON objects with users and optional emails
var contacts = [
    {key: 1, name: "James Nelson", email: "james@jamesknelson.com"},
    {key: 2, name: "Bob"},
    {key: 3, name: "Miguel", email:"mikydoc_sev@hotmail.com"}
    ]

//  Now let's filter the array by choosing the ones with email
var getEmailFromContact = function(contact) { return contact.email; }
        
//filter function applies a condition and return the elements of the array that returns not null
//map function applies the passed function to all elements of the array. In this case we 
//return the html created with React.createElements()
var listElements = contacts.filter(getEmailFromContact)
                           .map(function(contact) {
                                          return React.createElement('li', {key: contact.key},
                                                      React.createElement('h2', {}, contact.name),
                                                      React.createElement('a', {href: 'mailto:'+contact.email}, contact.email))
                        });


//Now we can use the var listElements into our React.createElement
var rootElement = React.createElement('div',{},
                                    React.createElement('h1',{},"Contacts"),
                                                React.createElement('ul', {}, listElements) 
                                    );
        
ReactDOM.render(rootElement, document.getElementById('react-app'));