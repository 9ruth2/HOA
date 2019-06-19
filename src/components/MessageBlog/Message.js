import React, { Component } from 'react'
import './Message.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

 
class Message extends Component {

    state = {
        input: "",
        largestId: 1,
        messages: []
      }
    
      handleChangeText = event => {
        const value = event.target.value;
        this.setState({
          input: value
        });
      };
    

      render() {
        return (
          <React.Fragment>
            <div className= "messages_body">
                <h1 className = "messages_h1">לוח הודעות</h1>
                <form>
                    <label>:הכנס/י הודעה</label><br/>
                    <div>
                        <textarea className = "messages_textarea"
                        type="text"
                        value={this.state.input}
                        onChange={this.handleChangeText}
                        placeholder="..כתוב כאן טקסט"
                        />
                    </div>
                    <button className = "messages_btn" type='button' onClick={() => this.onClickSave()}>שמור</button>
                </form>
                {this.getMessage()} 
              </div>
          </React.Fragment>
        )
      }

//----------------------- Functions ---------------------------

componentDidMount(){
  const db = firebase.firestore();
  db.collection('Messages').get().then(snapshot => {
    snapshot.forEach(docs => {
      if(docs.exists){
        this.setState({
          messages: docs.data().messages,
          largestId: docs.data().largestId
        })
      }
  })})
  }

      getMessage()
      {
        return this.state.messages.map(messageObj => {
          if(messageObj == null || messageObj.text == null || messageObj.text.length <= 0) return null
         
         return <div key={messageObj.id} className = "message_button_buuble">
          <p>{messageObj.timestamp} :תאריך  {messageObj.author} :נכתב ע"י</p>        
          <p className = "messages_talkbubble">{messageObj.text} :הודעה</p>
          <br/>
          <button className = "messages_btnDel" onClick={() => this.onClickDelete(messageObj.id)}>מחק</button>  
          </div>
        })
      }


      onClickDelete(idToDelete)
      {
        const db = firebase.firestore();
        var temp = db.collection('Messages').doc("temp-building-messages-id")
        temp.update({messages: this.state.messages.filter(item => item.id !== idToDelete)});
        this.setState({messages: this.state.messages.filter(item => item.id !== idToDelete) });
      }    


    onClickSave()
    {
      if(this.state.input !== '')
      {

        this.setState({ 
          messages: [...this.state.messages, {
          text: this.state.input,
          timestamp: new Date().toLocaleString('en-US', {hour12: false}),
          author: "USER",
          id: this.state.largestId++
        }] 
      } , () => {
        const db = firebase.firestore();
        db.collection('Messages').doc("temp-building-messages-id").update({
        messages: this.state.messages,
        largestId: this.state.largestId})
      });

      this.setState({ input: ''});
    }
  }
}

export default Message



