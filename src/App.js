import React, {Component} from 'react';
//mport logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import UserPage from './components/UserPage';

class App extends Component {

  state = {
    name: null
  }

  render() {

  // const aut = firebase.auth();
  // aut.createUserWithEmailAndPassword("hello@gmail.com", "123456789")
  // aut.currentUser.email
  // aut.signOut()


//loading the name information from the database

  // const fs = firebase.firestore()
  // fs.collection("Apt").doc("UuBQJ0gnmQZvtPJD9fM0").get().then(result => {
  //   this.setState({
  //     name: result.data().name
  //   })
    
  // })


  // fs.collection('Apt').add({
  //   name: 'hello',
  //   age: 555
  // })



  return( <UserPage>
    
  </UserPage>
  );

//return loading till we get the name from the DB

  // if(this.state.name == null) {
  //   return <h1>Loading...</h1>
  // }
  // return (
  //   <h1>{this.state.name}</h1>
  // );
  }

}

export default App;
