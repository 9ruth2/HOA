import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase/app'
import './App.css';
import 'firebase/firestore'
import 'firebase/auth'
import UserPage from './components/UserPage';
import CreatBuilding from './components/CreatBuilding';
import CreateApt from './components/CreateApt'
import Message from './components/MessageBlog/Message';
import HomePage from './components/HomePage/HomePage';
import Tenant from './components/Tenant'
import CreateAptPage from './components/CreateAptPage';
import CreatePayment from './components/Payment/CreatePayment';
import PaymentTable from './components/Payment/PaymentTable';
import EventCalendar from './components/EventCalendar';
import PaymentMainPage from './components/Payment/PaymentMainPage';
import SignIn from './components/SignIn/SignIn';
import NewComponentText from './components/NewComponentText';
import ContactTable from './components/ContactTable';
import LogOut from './components/SignIn/LogOut';


class App extends Component 
{

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

  render() 
  {
    return(
      <div>
      

          <Switch>
          <Route path="/calendar" exact component={EventCalendar} />
          <Route path="/sign-in" exact component={SignIn} />
          <Route path="/HomePage" exact component={HomePage} />
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
  
      </div>
    );

    }
}

export default App;
