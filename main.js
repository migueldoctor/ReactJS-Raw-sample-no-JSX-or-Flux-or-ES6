//  Let us create an array JSON objects with users and optional emails and descriptions
var contacts = [
    {key: 1, name: "Fake user", email: "fakeemail@mail.com", description: "This is a fake user to make the sample"},
    {key: 2, name: "Bob", description:"Bob is a great user but without email, so he will be filtered out"},
    {key: 3, name: "Miguel", email:"MiguelfakeEmail@mail.com"}
    ]

// We create the React Component ContactItem
var ContactItem = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string,
        description: React.PropTypes.string,
    },

    render: function() {
        return (
            React.createElement('li',{}, //Adding the key in order to improve react performance
                React.createElement('h2',{},this.props.name),
                React.createElement('a',{href:'mailto:'+this.props.email}, this.props.email),
                React.createElement('div',{},this.props.description)
            )
        );
    }
});

//3) Apply the filter and for each element in the array (contact), we return the element ContactItem just defined
var getEmailFromContact = function(contact) { return contact.email; }
var listElements = contacts.filter(getEmailFromContact)
                           .map(function(contact) {
                                          return React.createElement(ContactItem,contact); // HERE YOY CAN SEE THAT THE PARAMETER OF ContactItem must be an object with name, description and email
                        });


//Now we can use the var listElements into our React.createElement
var rootElement = React.createElement('div',{},
                                    React.createElement('h1',{},"Contacts"),
                                                React.createElement('ul', {}, listElements) 
                                    );
        
ReactDOM.render(rootElement, document.getElementById('react-app'));