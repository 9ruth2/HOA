import React, {Component} from 'react';
//mport logo from './logo.svg';
import './App.css';
//import Firebase from './Firebase'
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
import CreatePayment from './components/Payment/CreatePayment';
import PaymentTable from './components/Payment/PaymentTable';
import PaymentMainPage from './components/Payment/PaymentMainPage';
import SignIn from './components/SignIn/SignIn';
import LogOut from './components/SignIn/LogOut';
//import EventCalendar from './components/EventCalendar'

class App extends Component {

  // state = {
  //   name: null
  // }

  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
  
  return(
<<<<<<< HEAD
    <Switch>
      <Route path="/sign-in" exact component={SignIn} />
      <Route path="/message" exact component={Message} />
      <Route path="/create-building" exact component={CreatBuilding} />
      <Route path="/user-page" exact component={UserPage} />
      <Route path="/create-apt" exact component={CreateApt} />
      <Route path="/create-apt-page" exact component={CreateAptPage} />
      <Route path="/tenant" exact component={Tenant} />
      <Route path="/payment/create-payment" exact component={CreatePayment} />
      <Route path="/payment/payment-table" exact component={PaymentTable} />
      <Route path="/payment/payment-main-page" exact component={PaymentMainPage} />
      <Redirect to='/sign-in'/>
    </Switch>

=======
    <div>
>>>>>>> dca5b6d3530e76e3f1bc3f56556d4a74bec0237a
    

      {this.state.user ?  (
        <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/message" exact component={Message} />
        <Route path="/create-building" exact component={CreatBuilding} />
        <Route path="/user-page" exact component={UserPage} />
        <Route path="/create-apt" exact component={CreateApt} />
        <Route path="/create-apt-page" exact component={CreateAptPage} />
        <Route path="/tenant" exact component={Tenant} />
        <Route path="/payment/create-payment" exact component={CreatePayment} />
        <Route path="/payment/payment-table" exact component={PaymentTable} />
        <Route path="/payment/payment-main-page" exact component={PaymentMainPage} />
       <Redirect to='/user-page'/>
      </Switch>
      ) : (<SignIn />)}

    </div>

  );

  }
}

export default App;
