/******************************************* 
 * DATA SECTION
 ******************************************/
var contacts = [
    {key: 1, name: "Fake user", email: "fakeemail@mail.com", description: "This is a fake user to make the sample"},
    {key: 2, name: "Bob", description:"Bob is a great user but without email, so he will be filtered out"},
    {key: 3, name: "Miguel", email:"MiguelfakeEmail@mail.com"}
    ]


var newContact = {name: "", email: "", description: ""}

/******************************************* 
 * COMPONENTS CREATION SECTION 
 ******************************************/

// React Component ContactItem
var ContactItem = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string,
        description: React.PropTypes.string
    },

    render: function() {
        return (
            React.createElement('li',{className: 'ContactItem'}, //Adding the key in order to improve react performance
                React.createElement('h2',{className: 'ContactItem-name'},this.props.name),
                React.createElement('a',{className: 'ContactItem-email', href:'mailto:'+this.props.email}, this.props.email),
                React.createElement('div',{className: 'ContactItem-description'},this.props.description)
            )
        );
    }
});



// React Component ContactForm
var ContactForm = React.createClass({
    propTypes: {
        contact: React.PropTypes.object.isRequired
    },

    render: function(){
        return ( 
            React.createElement('form', {className: 'ContactForm'},
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

// React Component ContactView
var ContactView = React.createClass({
    propTypes: {
         contacts: React.PropTypes.array.isRequired,
         newContact: React.PropTypes.object.isRequired,
    },
    render: function() {
        // Apply the filter and for each element in the array (contact), we return the element ContactItem just defined
        var getEmailFromContact = function(contact) { return contact.email; }
        var listElements = contacts.filter(getEmailFromContact)
                                   .map(function(contact) {
                                          return React.createElement(ContactItem,contact); // HERE YOY CAN SEE THAT THE PARAMETER OF ContactItem must be an object with name, description and email
                                    });

        return (
                React.createElement('div',{className:'ContactView'},
                            React.createElement('h1',{className:'ContactView-title'},"Contacts"),
                                    React.createElement('ul', {className:'ContactView-list'}, listElements),
                                    React.createElement(ContactForm, {contact:this.props.newContact})
                                    )
        )
    }
});

/******************************************* 
 * ENTRY POINT SECTION 
 ******************************************/
 
ReactDOM.render(React.createElement(ContactView,{
                                    contacts: contacts, 
                                    newContact:newContact
                                    }), 
                                document.getElementById('react-app'));