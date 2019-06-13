import React, {Component} from 'react';
//mport logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import UserPage from './components/UserPage';
import CreatBuilding from './components/CreatBuilding';
import CreateApt from './components/CreateApt'
import Message from './components/Message';
import NewComponentText from './components/NewComponentText';
import Tenant from './components/Tenant'
import ContactTable from './components/ContactTable';

import { Route, Switch, Redirect } from 'react-router-dom';
import CreateAptPage from './components/CreateAptPage';
//import EventCalendar from './components/EventCalendar'

class App extends Component {

  state = {
    name: null
  }

  render() {
  
  return(
    <Switch>
          <Route path="/create-building" exact component={CreatBuilding} />
          <Route path="/user-page" exact component={UserPage} />
          <Route path="/create-apt" exact component={CreateApt} />
          <Route path="/create-apt-page" exact component={CreateAptPage} />
          <Route path="/tenant" exact component={Tenant} />
          <Redirect to='/create-building'/>
    </Switch>


     //<Message/>
     //<EventCalendar/>

     
// ruth's components 

     //<CreateApt/>
     //<UserPage/>
     //<Tenant/>
     //<ContactTable/>
    
=======
import Message from './blog/Message'


function App() {
  return (
    <Message />
>>>>>>> message blob
  );






  }

}

export default App;
