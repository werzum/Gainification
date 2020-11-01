import React, {Component} from 'react';
import HeadCardPpE from "./Components/headerCard.js"
import CustomAppBar from "./Components/appBar.js"
import {Grid} from "@material-ui/core";
import FetchDishes from "./FetchDishes";
import SortableTable from "./Components/table.js"

//TODO
//-sorting works only until price, not for FPE and so forth - why?

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today : [{name:"",kcal:0,carbs:0,protein:0,fat:0,price:0,category:"",KcalpE:0,PpE:0,FpE:0,CpE:0,gainfactor:0}],
      //4 empty ones to replace them later
      topCards: [{},{},{},{}]
    };
  }

  //call the node server to get the list of dishes
  callAPI() {
    let today = []
    FetchDishes().then(res=>res.json()).then(res =>{
        //add the entries to todays list
        for (const entry of res[0].mealList){
          today.push({name : entry.name, kcal : entry.kcal, carbs:entry.carbs,protein:entry.protein,fat:entry.fat,price:entry.price,
          category:entry.category,KcalpE:entry.KcalpE,PpE:entry.PpE,FpE:entry.FpE,CpE:entry.CpE,gainfactor:entry.gainfactor});
        }
        this.setState({
          today : today
        })
        //and set the topCards
        this.computeTopCards();
      })
  }

  computeTopCards(){
    let cards = this.state.today;
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

  componentDidMount(){
    this.callAPI()
    console.log("calling API")
  }

  render(){
    return(
        <div className="App">
          <CustomAppBar/>
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
            <SortableTable prop={this.state.today}/>
        </div>
    )
  }
}

export default App;
