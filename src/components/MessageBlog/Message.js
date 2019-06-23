import React, { Component } from 'react'
import './Message.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import NavBar from '../navBar/NavBar'


const uid = 'OUxhlc3PgBTAsaX1ZgBqe3mmlXN2'

class Message extends Component {

  buildingId = null

  state = {
    input: "",
    messages: []
  }

  handleChangeText = event => {
    const value = event.target.value;
    this.setState({
      input: value
    });
  };


  render() {
    if (/*firebase.auth().currentUser*/ uid == null) return null
    return (
      <React.Fragment>
        <NavBar/>
        <div className="messages_body">
          <h1 className="messages_h1">לוח הודעות</h1>
          <form>
            <label>:הכנס/י הודעה</label><br />
            <div>
              <textarea className="messages_textarea"
                type="text"
                value={this.state.input}
                onChange={this.handleChangeText}
                placeholder="..כתוב כאן טקסט"
              />
            </div>
            <button className="messages_btn" type='button' onClick={() => this.onClickSave()}>שמור</button>
          </form>
          <p></p>
          {this.getMessage()}
        </div>
      </React.Fragment>
    )
  }

  //----------------------- Functions ---------------------------

  componentDidMount() {
    if (/*firebase.auth().currentUser*/ uid == null) return
    firebase.firestore().collection("Apt").doc(uid).get().then(
      result => {
        if (!result.exists) return
        this.buildingId = result.data().buildingId
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
    console.log(this.state.messages)
    return this.state.messages.map(messageObj => {
      if (messageObj == null || messageObj.text == null || messageObj.text.length <= 0) return null
      return <div key={messageObj.id} className="message_button_buuble">
        <p>{messageObj.timestamp} :תאריך  {messageObj.author} :נכתב ע"י</p>
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


  onClickSave() {
    if(this.buildingId == null || this.buildingId.length <= 0) {
      alert('no building to add the message to')
      return
    }
    if (this.state.input === '') return
    const newMessageObj = {
      text: this.state.input,
      timestamp: new Date().toLocaleString('en-US', { hour12: false }),
      author: (firebase.auth().currentUser == null) ? "UNKNOWN" : firebase.auth().currentUser.fullName,
    }
    const db = firebase.firestore();
    db.collection('Building').doc(this.buildingId).collection('Message').add(newMessageObj)
    .then(result => {
      newMessageObj.id = result.id
      this.setState({
        messages: [...this.state.messages, newMessageObj]
      }, () => {
        const db = firebase.firestore();
        db.collection('Building').doc(this.buildingId).collection('Message').add(newMessageObj)
      });
      this.setState({ input: '' });
    })
  }
}

export default Message



