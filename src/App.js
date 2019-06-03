import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

class App extends Component {

  state = {
    name: null
  }

  render() {
  // const aut = firebase.auth()
  // aut.createUserWithEmailAndPassword("hello@gmail.com", "123456789")
  // aut.currentUser.email
  // aut.signOut()


  const fs = firebase.firestore()
  fs.collection("Apt").doc("74FxCUzaLcOXH3Lcqyxh").get().then(result => {
    this.setState({
      name: result.data().name
    })
    
  })
  // fs.collection('Apt').add({
  //   name: 'hello',
  //   age: 555
  // })
  if(this.state.name == null) {
    return <h1>Loading...</h1>
  }
  return (
    <h1>{this.state.name}</h1>
  );
  }

}

export default App;
