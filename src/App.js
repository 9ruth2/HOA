import React, {Component} from 'react';
//mport logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import UserPage from './components/UserPage';
import CreatBuilding from './components/CreatBuilding';
import CreateApt from './components/CreateApt'
import Message from './components/Message';
import NewComponentText from './components/NewComponentText';

//import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {

  state = {
    name: null
  }

  render() {
  
  return(
    //<NewComponentText/> 
      <CreateApt/>
     //<Message/>
     
    
    // <UserPage/>
     //<CreatBuilding/>
    
  );

  // const aut = firebase.auth();
  // aut.createUserWithEmailAndPassword("hello@gmail.com", "123456789")
  // aut.currentUser.email
  // aut.signOut()


//loading the name information from the database

  // const fb = firebase.firestore()
  // fb.collection("Apt").doc("UuBQJ0gnmQZvtPJD9fM0").get().then(result => {
  //   this.setState({
  //     name: result.data().name
  //   })
    
  // })





  }

}

export default App;
