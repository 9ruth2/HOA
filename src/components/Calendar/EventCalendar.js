//import { render } from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './Calendar.css'
import NavBar from '../navBar/NavBar';
import 'moment/locale/he';


moment.locale('he');
const localizer = BigCalendar.momentLocalizer(moment);

const uid = 'OUxhlc3PgBTAsaX1ZgBqe3mmlXN2'

class EventCalender extends Component {


  BigCalendarStyle = () => {

    return {
      height: 700
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      allDay: '',
      start: '',
      end: '',
      id: 1,
      events: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    const target = event.target;

    if (event.target.name === 'title') {
      this.setState({
        title: target.value
      });
    }
    if (event.target.name === 'allDay') {
      this.setState({
        allDay: target.value
      });
    }
    if (event.target.name === 'startDate') {
      this.setState({
        start: target.value
      });
    }
    if (event.target.name === 'endDate') {
      this.setState({
        end: target.value
      });
    }
  }

  handleSubmit(event) {

    if (this.state.title == '') {
      alert('חסר את שם האירוע')
    }
    else if (this.state.startDate == '' && this.state.endDate == '') {
      alert('חסרים תאריכים')
    }
    else if (this.state.startDate == '') {
      alert('חסר תאריך התחלה')
    }
    else if (this.state.endDate == '') {
      alert('חסר תאריך סיום')
    }
    
    else {
      this.setState({
        events: [...this.state.events,{
        title: this.state.title,
        allDay: this.state.allDay,
        start: this.state.start,
        end: this.state.end,
        id: this.state.id++
      }]
    } , () =>{   const db = firebase.firestore();
      db.collection('Events').doc('Events').update({
        events: this.state.events,
        id: this.state.id
      })}
      )
   
    }
  }



  /*
  componentDidMount(){
    const db = firebase.firestore();
    db.collection('Events').get().then(snapshot => {
      snapshot.forEach(docs => {
        if(docs.exists){
          this.setState({
            events: docs.data().events,
            id: docs.data().id
            })
        }          
    })})
  } 
  */
 componentDidMount() {
  if (/*firebase.auth().currentUser*/ uid == null) return
  firebase.firestore().collection("Events").doc(uid).get().then(
    result => {
      if (!result.exists) return
      this.buildingId = result.data().buildingId
      this.getEventsFromServer()
    }
  )
 }

  getEventsFromServer() {
    firebase.firestore().collection("Building").doc(this.buildingId).collection("Events").get().then(
      result => {
        if (result.empty) return
        this.setState({ messages: result.docs.map(doc => ({ id: doc.id, ...doc.data() })) })
      }
    )
  }



 //Clicking an existing event allows you to remove it
onSelectEvent(pEvent) {
   const r = window.confirm("האם את/ה בטוח/ה שאת/ה רוצה למחוק את האירוע?")
   if(r === true){
    
       const db = firebase.firestore();
       var temp = db.collection('Events').doc("Events")
        temp.update({events: this.state.events.filter(item => item.id !== pEvent.id)});
        this.setState({events: this.state.events.filter(item => item.id  !== pEvent.id)});
   }
  }
  
  render() {
    return (

      <>

    <NavBar></NavBar>
    <h1 className = 'calendar_big_title'>
      לוח אירועים
    </h1>
    <div className = 'calendar_bar'>
        <input className = 'calendar_title' name='title' onChange={event => this.handleChange(event)} placeholder='שם האירוע'/>
        <input className = 'calendar_startDate' name='startDate' onChange={event => this.handleChange(event)}  type='date' placeholder='start date'/>
        <input className = 'calendar_endDate' name='endDate' onChange={event => this.handleChange(event)}  type='date' placeholder='end date'/>
        
            <label className = 'titleAllDay'>:יום שלם</label>
            <input className = 'calendar_allDay' name = 'allDay' type='checkbox' placeholder='all day' onChange={event => this.handleChange(event)}/>
      
       <button className = 'calendar_save' onClick={() => this.handleSubmit()}>שמור ביומן</button>
        

    </div>



<BigCalendar
      messages={{
        previous: 'חודש קודם',
        next: 'חודש הבא',
        today: 'היום',
        month: 'חודש',
        week: 'שבוע',
        day: 'יום',
        agenda: 'סֵדֶר הַיוֹם',
        date: 'תאריך',
        time: 'שעה',
        event: 'אירוע',
      }}

      style={{height: '70vh'}}
      localizer={localizer}
      events={this.state.events}
      popup= {true}
      
      startAccessor="start"
      endAccessor="end"
      selectable={true} //אפשרות לבחור תאריכיפ ע"י לחיצה על היומן
  
      //defaultView={BigCalendar.Views.WEEK} //נשים אם נרצה שיראו בהתחלה רק את אותו שבוע 
      scrollToTime={new Date(1970,1,1,6)}
   
     // onSelectEvent={event => alert(event.title)}
   
      step={30} //קובע את קצב הזמן שניתן לבחירה בתצוגות שבוע ויום
      defaultView='month'  //התצוגה הראושנית היא חודש
     // views={['month','week','day']}  //הופעה של רק שלושת אלה בצד (ללא אגנדה שזה לראות את כל האירועים )
      scrollToTime={new Date(1970, 1, 1, 6)}// התאריך האחרון אליו הגלילה למטה תגיע
      onSelectEvent = {event => this.onSelectEvent(event)  } //Fires selecting existing event

   //   onSelectSlot={this.handleSelect} //יפעל כאשר נבחר תאריך ביומן
    />

      </>
    );

  }

}
export default EventCalender;