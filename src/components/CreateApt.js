import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import 'bootstrap/dist/css/bootstrap.css';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class CreateApt extends Component{
    
    CreateAptStyle = () => {
        return{
            textAlign: 'right',
            paddingRight: '1em',
            paddingTop: '2em'
        }
    }
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
    };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /*
if(){
    
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
      
}
    */

   handleChange(event){
        const target = event.target;
        if(target.type === 'email'){
            this.setState({
                email: target.value
            });
        }
        if(target.type ==='password'){
            this.setState({
                password: target.value
            });
        }
   }
   handleSubmit(event){
       if(this.state.email == '' || this.state.password == ''){
           alert("please type in all the filds")
       }
       else{
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            alert('error...')
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
       }
   }
    render(){
        return(
            <div className="CreateApt container" style = {this.CreateAptStyle()}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}   />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            );
        }
}

export default CreateApt;