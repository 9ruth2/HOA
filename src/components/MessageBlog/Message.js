import React, { Component } from 'react'
import './Message.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import NavBar from '../navBar/NavBar'


const uid = ''

class Message extends Component {

  buildingId = null
  fullName = ''

  state = {
    input: "",
    messages: [],
  }
  

  handleChangeText = event => {
    const value = event.target.value;
    this.setState({
      input: value
    });
  };


  render() {
    if (firebase.auth().currentUser == null) return null
    return (
      <React.Fragment>
        {/* <NavBar/> */}
        <div id="object" class="slideLeft">
        <div className="messages_body">

          <h1 className="messages_h1">לוח מודעות</h1>
          <form>
            <label>מוסרים משהו? צריכים משהו? כתבו לדיירי הבניין</label>
            <div>
              <textarea className="messages_textarea"
                type="text"
                value={this.state.input}
                onChange={this.handleChangeText}
                placeholder="..כתוב כאן את הודעתך   "
              />
            </div>
            <button className="messages_btn" type='button' onClick={() => this.onClickSave()}>שלח</button>
          </form>
          <p></p>
          {this.getMessage()}
        </div>
        </div>
      </React.Fragment>
    )
  }

  //----------------------- Functions ---------------------------
//1test@test.com
  componentDidMount() {
    console.log(firebase.auth().currentUser.uid)
    if (firebase.auth().currentUser == null) return
    firebase.firestore().collection("Apt").doc(firebase.auth().currentUser.uid).get().then(
      result => {
        if (!result.exists) return
        this.buildingId = result.data().buildingId
        this.fullName = result.data().fullName
        this.getMessagesFromServer()
      }
    )
  }


  getMessagesFromServer() {
    firebase.firestore().collection("Building").doc(this.buildingId).collection("Message").get().then(
      result => {
        if (result.empty) return
        this.setState({ messages: result.docs.map(doc => ({ id: doc.id, ...doc.data() })) })
      }
    )
  }


  getMessage() {
    return this.state.messages.map(messageObj => {
      if (messageObj == null || messageObj.text == null || messageObj.text.length <= 0) return null

      return <div key={messageObj.id} className="message_button_buuble">
        <p>נכתב ע"י: {messageObj.author}</p>
        <p>{messageObj.timestamp} :תאריך</p>
        <p className="messages_talkbubble"> הודעה: {messageObj.text}</p>
        <br />
        <button className="messages_btnDel" onClick={() => this.onClickDelete(messageObj.id)}>מחק</button>
      </div>
    })
  }


  onClickDelete(idToDelete) {
    const db = firebase.firestore();
    db.collection('Building').doc(this.buildingId).collection('Message').doc(idToDelete).delete()
    this.setState({ messages: this.state.messages.filter(item => item.id !== idToDelete) });
   
  }


  onClickSave()
  {
    if(this.buildingId == null || this.buildingId.length <= 0) {
      alert('no building to add the message to')
      return
    }

    if (this.state.input === '') return
    const newMessageObj = {
      text: this.state.input,
      timestamp: new Date().toLocaleString('en-GB', { hour12: false }),
      author: this.fullName
    }
 
    if(newMessageObj.author === undefined) newMessageObj.author = '';

      
    const db = firebase.firestore();
    db.collection('Building').doc(this.buildingId).collection('Message').add(newMessageObj)
    .then(result => {
      newMessageObj.id = result.id
      this.setState({
        messages: [...this.state.messages, newMessageObj] });
      this.setState({ input: '' });
    })
  }
}

export default Message



