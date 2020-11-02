import React, {Component} from 'react';
import HeadCardPpE from "./Components/headerCard.js"
import CustomAppBar from "./Components/appBar.js"
import {Grid} from "@material-ui/core";
import FetchDishes from "./FetchDishes";
import SortableTable from "./Components/table.js"

class App extends Component {
  constructor(props) {
    super(props);
    this.nextDay = this.nextDay.bind(this);
    this.previousDay = this.previousDay.bind(this);
    this.state = {
      weekDays:[{day:"",dateTime:"",mealList:[
        {name:"",kcal:0,carbs:0,protein:0,fat:0,price:0,category:"",KcalpE:0,PpE:0,FpE:0,CpE:0,gainfactor:0}
      ]}],
      //4 empty ones to replace them later
      topCards: [{},{},{},{}],
      selectedDay:0
    };
  }

  //call the node server to get the list of dishes
  callAPI() {
    
    let todaysData = []
    
    FetchDishes().then(res=>res.json()).then(res =>{

      for(let i=1;i<res.length;i++){
        let dayData = {dateTime:"",mealList:[]};
        dayData.dateTime = res[i].dateTime;
        dayData.mealList = [];
        for (const entry of res[i].mealList){
          dayData.mealList.push({name : entry.name, kcal : entry.kcal, carbs:entry.carbs,protein:entry.protein,fat:entry.fat,price:entry.price,
            category:entry.category,KcalpE:entry.KcalpE,PpE:entry.PpE,FpE:entry.FpE,CpE:entry.CpE,gainfactor:entry.gainfactor});
        }
        todaysData.push(dayData);
      }

      this.setState({ weekDays: todaysData})
      
      //and set the topCards
      this.computeTopCards(this.state.selectedDay);
      })
  }

  //compute the prominent top cards
  computeTopCards(selectedDay){
    let cards = this.state.weekDays[selectedDay].mealList;
    let topCards = this.state.topCards;
    //for each entry of todays list, check whether it is higher than the rest and belongs to the topcards. Break if found
    for (const entry of cards){
      if(cards.every((value => (value.PpE <= entry.PpE)),entry)){
        topCards[0] = entry;
        continue;
    }};
    for (const entry of cards){
      if(cards.every((value => (value.protein <= entry.protein)),entry)){
        topCards[1] = entry;
        continue;
    }};
    for (const entry of cards){
      if(cards.every((value => (value.KcalpE <= entry.KcalpE)),entry)){
        topCards[2] = entry;
        continue;
    }};
    for (const entry of cards){
      if(cards.every((value => (value.kcal <= entry.kcal)),entry)){
        topCards[3] = entry;
        continue;
    }};

    this.setState({topCards:topCards});
  }

  //fetch the JSON data when component is mounted
  componentDidMount(){
    this.callAPI()
  }

  //pass this to datePicker component to change selectedDay
  nextDay(newSelectedDay){
    if(newSelectedDay<6){
      newSelectedDay++;
    }
    this.setState({selectedDay:newSelectedDay})
  }
  previousDay(newSelectedDay){
    if (newSelectedDay>1) {
      newSelectedDay--;}
    this.setState({selectedDay:newSelectedDay})
  }
  render(){
    return(
        <div className="App">
          <CustomAppBar selectedDay={this.state.selectedDay} dateTime={this.state.weekDays[this.state.selectedDay].dateTime} nextDay={this.nextDay} previousDay={this.previousDay}/>
            <Grid container={true} spacing={2} style={{margin:5}}>
              {
                this.state.topCards.map((prop)=>{
                  return(
                    <Grid item={true} xs={6} sm={6} md={3}>
                      <HeadCardPpE {...prop} key={prop.name}/>
                    </Grid>
                  )})
              }
            </Grid>
            <SortableTable prop={this.state.weekDays[this.state.selectedDay].mealList}/>
        </div>
    )
  }
}

export default App;
